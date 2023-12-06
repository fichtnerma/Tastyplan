from app.models.recipe import Recipe
from .findSimilar import findSimilarIngredient
import requests
import logging
import redis
import json

logger = logging.getLogger(__name__)
r = redis.Redis(host='redis', port=6379)


class Mapping():

    def parseIngredients(self, recipe: Recipe):
        ingredients = parseIngredients()
        recipe_ingredients = recipe.ingredients
        mapped_ingredients = []
        for mappable_ingr in recipe_ingredients:
            similarIngr = findSimilarIngredient(ingredients, mappable_ingr)
            # create object with similar ingredient and its quantity
            mappedIngr = {
                'name': similarIngr['name'],
                'ingredientId': similarIngr['ingredientId'],
                'condition': similarIngr['condition'],
                'quantity': mappable_ingr.quantity,
                'unit': mappable_ingr.unit
            }
            mapped_ingredients.append(mappedIngr)
        return mapped_ingredients


def parseIngredients():
    data = r.get('ingredients')

    # Parse the JSON data
    if data:
        data = json.loads(data.decode('utf-8'))
        return data
