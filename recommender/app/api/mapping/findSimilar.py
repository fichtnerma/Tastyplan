import logging
from fuzzy_match import algorithims
import jellyfish
from app.models.ingredients import Ingredient

logger = logging.getLogger(__name__)


def findSimilarIngredient(ingredientsList, ingredient: Ingredient):
    """
    Find similar ingredient in the list of ingredients
    :param ingredientsList: list of ingredients
    :param ingredient: ingredient to find similar to
    :return: similar ingredients
    """
    similarIngredients = []
    ingredientName, condition = seperateIntoIngredientAndCondition(
        ingredient.name)

    for ing in ingredientsList:
        damerau_levenshtein, jaro_winkler, cosine, trigram = 1, 1, 1, 1

        jaro_winkler = algorithims.jaro_winkler(ing['name'], ingredientName)
        if (jaro_winkler < 0.85):
            cosine = algorithims.cosine(ing['name'], ingredientName)
            trigram = algorithims.trigram(ing['name'], ingredientName)
            damerau_levenshtein = (1 - (jellyfish.damerau_levenshtein_distance(
                ing['name'], ingredientName) / max(len(ing['name']), len(ingredientName))))

        ingredient_with_similarities = {
            'ingredientId': ing['id'],
            'name': ing['name'],
            'condition': condition,
            'source': ingredientName,
            'similarity': (cosine * 1.5 + damerau_levenshtein + jaro_winkler + trigram * 1.5) / 5,
        }
        similarIngredients.append(ingredient_with_similarities)
        similarIngredients.sort(
            key=lambda x: x['similarity'], reverse=True)
    return similarIngredients[0]


def seperateIntoIngredientAndCondition(input_ingredient):
    """
    Seperate condition from ingredient
    :param ingredient: ingredient to seperate condition from
    :return: ingredient and condition
    """
    first_comma_index = input_ingredient.find(',')
    if first_comma_index != -1:
        ingredient = input_ingredient[:first_comma_index].strip()
        condition = input_ingredient[first_comma_index + 1:].strip()
    else:
        ingredient = input_ingredient
        condition = ""
    return ingredient, condition
