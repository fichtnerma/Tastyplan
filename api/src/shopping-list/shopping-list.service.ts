import { Injectable } from '@nestjs/common';
import { RecipesService } from 'src/recipes/recipes.service';

@Injectable()
export class ShoppingListService {
    constructor(private recipesService: RecipesService) { }

    async create(recipeIds: number[]) {
        const recipeIngredients = await Promise.all(recipeIds.map(async id => {
            const recipe = await this.recipesService.findById(id)

            return recipe.ingredients
        }))
        const flattenedIngredients = recipeIngredients.flat()

        const ingredientMap: any = {}

        flattenedIngredients.forEach(ingredient => {
            if (ingredient.id in ingredientMap) {
                ingredientMap[ingredient.id].quantity += ingredient.quantity

            }
            else {
                ingredientMap[ingredient.id] = { ...ingredient }
            }
        })

        const summurizedIngredients = Object.values(ingredientMap)
        console.log(summurizedIngredients)


        /*         const summedIngredients = []
                flattenedIngredients.forEach((outerIngredient, i) => {
                    let summedIngredient = outerIngredient;
                    flattenedIngredients.splice(i, 1);
                    flattenedIngredients.forEach((innerIngredient, k) => {
                        //Right now we expect, that the same ingredient has the same unit
                        if (summedIngredient.id === innerIngredient.id) {
                            summedIngredient = {
                                ...summedIngredient,
                                quantity: summedIngredient.quantity + innerIngredient.quantity
                            }
                            flattenedIngredients.splice(k, 1);
                        }
        
                    })
                }) */
        //Take Element
        //Iterate with it trough the array
        //If number is same add up + take unit
        //remove all Elements
    }
}
