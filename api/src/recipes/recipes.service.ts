import { RecipesSearchService } from './recipesSearch.service';
import { Preferences, RecipesFilterService } from './recipesFilter.service';
import { RecipeQueries } from './recipe.queries';
import { CreateRecipeInput, ExtendetRecipe, RecipeInput } from './recipe.interface';
import { PostRecipeDto } from './dto/post-recipe.dto';
import { convertToTime, shuffleArray } from 'src/helpers/converter.utils';
import * as sharp from 'sharp';
import * as path from 'path';
import { Cache } from 'cache-manager';
import { S3 } from 'aws-sdk';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RecipesService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cache: Cache,
        private recipeFilterService: RecipesFilterService,
        private recipeSearchService: RecipesSearchService,
        private recipeQueries: RecipeQueries,
    ) {}

    async findById(id: number) {
        try {
            return await this.recipeQueries.findUniqueRecipe(id);
        } catch (error) {
            throw new InternalServerErrorException('Error: Failed to find recipe by id');
        }
    }

    async storeInRedis() {
        const recipes = await this.recipeQueries.findManyRecipes();

        const recipesFormatted = recipes.map((recipe) => ({
            ...recipe,
            ingredients: recipe.ingredients.map((ingredient) => ({ ...ingredient, name: ingredient.ingredient.name })),
        }));
        await this.cache.set('recipes', recipesFormatted, 0);
    }

    async createRecipe(recipe: RecipeInput, recipeId: number) {
        const extendedRecipe: ExtendetRecipe = {
            ...recipe,
            cookingTime: convertToTime(recipe.cookingTime) || 0,
            preparingTime: convertToTime(recipe.prepareTime) || 0,
            totalTime: convertToTime(recipe.totalTime) || 0,
            servings: +recipe.servings || 4,
            formOfDiet: recipe.formOfDiet || 'omnivore',
        };
        await this.recipeQueires.upsertRecipe(extendedRecipe, recipeId);
    }

    async categorizeRecipe(
        ingredients: {
            categories: string;
            subcategories: string;
        }[],
    ) {
        const omnivoreCategories = ['Meat and sausage products', 'Meat and offal'];
        const pescetaraianCategories = ['Fish'];
        const vegetarianCategories = ['Milk and dairy products', 'Eggs'];

        const omnivoreSubCategories = [
            'Boiled sausage products',
            'Raw sausage products',
            'Meat Stews',
            'Cooked sausages',
            'Veal,meat and offal',
            'Wild',
            'Poultry',
            'Pork,meat and offal',
            'Lamb, Sheep',
            'Poultry,meat and offal',
            'Beef',
            'Pig',
        ];
        const pescetaraianSubCategories = [
            'Sea fish',
            'Freshwater fish',
            'Freshwater fish,Fish',
            'Seafood, crustaceans and shellfish',
            'Fish products',
        ];
        const vegetarianSubCategories = [
            'Gelling and binding agents',
            'Hard cheese',
            'Cream cheese and curd',
            'Soft cheese',
            'Milk and yoghurt drinks',
            'Milk and yoghurt drinks,Soft drinks',
            'Cream,Milk and dairy products',
            'Milk',
            'Fats,milk and dairy products',
            'Yoghurt and sour milk',
            'Fat',
            'Cream cheese and curd,milk and dairy products',
            'Creams and puddings',
            'Mayonnaises',
            'Soft cheese,Milk and dairy products',
            'Cheese products',
        ];

        const formOfDiet = ingredients.reduce(
            (acc, curr) => {
                if (
                    omnivoreCategories.includes(curr.categories) ||
                    omnivoreSubCategories.includes(curr.subcategories)
                ) {
                    acc.splice(acc.indexOf('pescetarian'), 1);
                    acc.splice(acc.indexOf('vegetarian'), 1);
                    acc.splice(acc.indexOf('vegan'), 1);
                }
                if (
                    pescetaraianCategories.includes(curr.categories) ||
                    pescetaraianSubCategories.includes(curr.subcategories)
                ) {
                    acc.splice(acc.indexOf('vegetarian'), 1);
                    acc.splice(acc.indexOf('vegan'), 1);
                }
                if (
                    vegetarianCategories.includes(curr.categories) ||
                    vegetarianSubCategories.includes(curr.subcategories)
                ) {
                    acc.splice(acc.indexOf('vegan'), 1);
                }
                return acc;
            },
            ['omnivore', 'pescetarian', 'vegetarian', 'vegan'],
        );

        return formOfDiet.at(-1) || 'omnivore';
    }

    async getRecommendations(k: number, preferances: Preferences, id: string) {
        try {
            let recommendedRecipeIds;
            if (id) {
                const recommendedRecipeRes = await fetch(`${process.env.RECOMMENDER_URL}/recommend/${id}?k=${k * 4}`);
                recommendedRecipeIds = (await recommendedRecipeRes.json())[0];
            }

            let { recipes: fetchedMeals } = await this.recipeFilterService.filterByQuery(
                preferances,
                recommendedRecipeIds || undefined,
            );

            if (fetchedMeals.length < k) {
                fetchedMeals = [...fetchedMeals, ...fetchedMeals, ...fetchedMeals, ...fetchedMeals];
            }

            const shuffeledMeals = shuffleArray(fetchedMeals);
            const recipeIds = shuffeledMeals.slice(0, k);
            const recipes = await this.recipeQueries.findManyRecipesWithId(recipeIds.map((object) => object.id));

            return recipes;
        } catch (error) {
            console.log(error);

            throw new InternalServerErrorException('Error: no k random recipes could be created');
        }
    }
    async postRecipe(postRecipeDto: PostRecipeDto, file: Express.Multer.File) {
        let imgPath = '';
        if (file) {
            file.buffer = await this.resizeAndCropImage(file);
            imgPath = await this.uploadImageToS3(file);
        } else {
            imgPath = 'RecipeStockImage.jpg';
        }
        const createRecipeInput: CreateRecipeInput = { ...postRecipeDto, img: imgPath };

        try {
            const result = await this.recipeQueires.createRecipe(createRecipeInput);
            return result;
        } catch (error) {
            console.log('Error saving to DB: ', error);
            if (file) {
                await this.deleteImageFromS3(file.originalname);
                console.log('Cleanup deletion successful');
            }
            throw new InternalServerErrorException('Error saving to DB');
        }
    }

    async uploadImageToS3(file: Express.Multer.File) {
        // Create a new instance of S3
        const s3 = new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });

        // Change the file extension to .png
        const fileName = path.parse(file.originalname).name + '.png';

        // Set up the parameters for the S3 upload
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: 'image/png',
            ACL: 'public-read', // Make the file publicly accessible
        };

        try {
            const data = await s3.upload(uploadParams).promise();
            return data.Location;
        } catch (error) {
            console.log('Error uploading file: ', error);
            throw new InternalServerErrorException('Error uploading file');
        }
    }

    async deleteImageFromS3(key: string) {
        const s3 = new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });

        const deleteParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        };

        try {
            await s3.deleteObject(deleteParams).promise();
            console.log(`File deleted successfully`);
        } catch (error) {
            console.log('Error deleting file: ', error);
            throw new InternalServerErrorException('Error deleting file');
        }
    }

    async resizeAndCropImage(file: Express.Multer.File): Promise<Buffer> {
        try {
            const image = sharp(file.buffer);
            const metadata = await image.metadata();
            const size = Math.min(metadata.width!, metadata.height!);
            const left = (metadata.width! - size) / 2;
            const top = (metadata.height! - size) / 2;

            const resizedImage = await image
                .extract({ left: Math.round(left), top: Math.round(top), width: size, height: size }) // crop image
                .resize(1024, 1024) // resize image
                .png() // convert to png
                .toBuffer(); // convert to buffer
            return resizedImage;
        } catch (error) {
            console.log('Error resizing image: ', error);
        }
    }
    getRecipeTags() {
        const tags = [
            'african',
            'appetizers and snacks',
            'asian',
            'bbq & grilling',
            'beans',
            'beans and peas',
            'beans and rice recipes',
            'beef',
            'beef soup recipes',
            'baked salmon recipes',
            'bread',
            'brazilian',
            'breakfast and brunch',
            'burger recipes',
            'caribbean',
            'carrot soup recipes',
            'casserole recipes',
            'cauliflower',
            'cheese',
            'chicken',
            'chicken breast',
            'chicken pasta',
            'chicken piccata recipes',
            'chili recipes',
            'chinese',
            'coconut',
            'creamy chicken',
            'crepes',
            'curries',
            'dinner',
            'eggs',
            'egyptian',
            'empanadas',
            'enchilada recipes',
            'european',
            'everyday cooking',
            'filipino',
            'fried rice recipes',
            'fruit salad recipes',
            'fruits',
            'fruits and vegetables',
            'fajita recipes',
            'german',
            'german potato salad recipes',
            'gnocchi recipes',
            'greek',
            'grains',
            'ground beef recipes',
            'ground turkey recipes',
            'grilled salmon recipes',
            'hot dogs and corn dogs recipes',
            'indian',
            'italian',
            'japanese',
            'korean',
            'latin american',
            'lentil soup recipes',
            'lunch',
            'main dishes',
            'mashed potato recipes',
            'meat and poultry',
            'meat sauce',
            'melons',
            'mexican',
            'mexican-style chicken',
            'middle eastern',
            'minestrone',
            'noodle recipes',
            'noodle soup recipes',
            'north african',
            'omelet recipes',
            'one-pot meal recipes',
            'orange salad recipes',
            'pan fried',
            'parmesan',
            'pasta',
            'pasta and noodles',
            'pasta by shape recipes',
            'pasta salad',
            'pasta sauces',
            'pastries',
            'persian',
            'pesto chicken recipes',
            'pilaf',
            'pork',
            'pork chop recipes',
            'pork soup recipes',
            'portuguese',
            'potato',
            'potato salad recipes',
            'potatoes',
            'potatoes au gratin recipes',
            'ramen noodle recipes',
            'rice',
            'rice bowl',
            'rice side dish recipes',
            'risotto recipes',
            'roasted',
            'roasted potato recipes',
            'roasted vegetable recipes',
            'salad',
            'sandwich recipes',
            'sauces',
            'sauces and condiments',
            'scallops',
            'scrambled',
            'seafood',
            'seafood main dishes',
            'seafood salad recipes',
            'shellfish',
            'sheet pan dinner recipes',
            'side dish',
            'side dishes',
            'skewers and kabobs',
            'soup recipes',
            'soups and stews',
            'soups, stews and chili recipes',
            'south african',
            'south american',
            'spanish',
            'spinach salad recipes',
            'squash',
            'stews',
            'stir-fry',
            'stuffed',
            'stuffed bell pepper recipes',
            'sweet',
            'tabbouleh',
            'taco recipes',
            'tacos',
            'tapas',
            'thai',
            'tomato pasta salad recipes',
            'tortellini recipes',
            'turkey',
            'vegetable salad recipes',
            'vegetable soup recipes',
            'vegetables',
            'vegan',
            'vegetarian',
            'vegetarian pasta salad recipes',
            'vegetarian taco recipes',
            'veggie',
            'vietnamese',
            'watermelons',
            'wraps and roll-ups',
            'wraps and rolls',
        ];
        return tags;
    }
}
