import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import IngredientsSearchService from './ingredientsSearch.service';

@Injectable()
export class IngredientsService {
    constructor(private prismaService: PrismaService, private ingredientSearchService: IngredientsSearchService) {
        this.createIndex();
    }

    async create(createIngredientDto: CreateIngredientDto) {
        const { name } = createIngredientDto;
        await this.prismaService.ingredient.create({
            data: {
                name: name,
                calories: 1,
                protein: 1,
                fat: 1,
                carbs: 1,
                calcium: 1,
                iron: 1,
                magnesium: 1,
                categories: 'test',
                subcategories: 'test',
            },
        });

        return 'This action adds a new ingredient' + name;
    }

    async createIndex() {
        const ingredients: any = await this.prismaService.ingredient.findMany();
        await this.ingredientSearchService.createIndex(ingredients);
    }

    async searchForIngredients(name: string) {
        const results = await this.ingredientSearchService.search(name);
        if (!results.length) {
            return [];
        }
        return results;
    }

    findAll() {
        return `This action returns all ingredients`;
    }

    async findOne(id: number) {
        return 'This action finds a ingredient';
    }

    async findSimilarIngredients(name: string) {
        return 'This action finds an ingredient with similar name';
    }

    update(id: number, updateIngredientDto: UpdateIngredientDto) {
        return `This action updates a #${id} ingredient`;
    }

    remove(id: number) {
        return `This action removes a #${id} ingredient`;
    }
}
