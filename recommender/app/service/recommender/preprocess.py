import pandas as pd
from app.models.recipe import Recipe
from typing import List

class Preprocessor():
    def preprocess(self, recipes: List[Recipe]):
        recipes_df = pd.json_normalize(recipes)
        recipes_df = self.groupFeatures(recipes_df)
        recipes_df["content"] = recipes_df["content"].apply(
            lambda x: x.lower())
        recipes_df["content"] = recipes_df["content"].apply(
            lambda x: x.replace("[", ''))
        recipes_df["content"] = recipes_df["content"].apply(
            lambda x: x.replace("]", ''))
        recipes_df["content"] = recipes_df["content"].apply(
            lambda x: x.replace(',', ''))
        recipes_df["content"] = recipes_df["content"].apply(
            lambda x: x.replace('.', ''))
        return recipes_df
    
    def groupFeatures(self, recipes_df: pd.DataFrame):
        recipes_df["content"] = recipes_df["name"] + " " + \
            str(recipes_df["tags"]) + " " + recipes_df["description"]
        ingredients = ""
        ingredientsSeries = pd.Series(recipes_df["ingredients"])
        for i in range(len(ingredientsSeries)):
            ingredients = ingredients + \
                str(pd.DataFrame(ingredientsSeries[i])["name"])

        recipes_df["content"] = recipes_df["content"] + \
            str(ingredients)

        steps = ""
        stepsSeries = pd.Series(recipes_df["steps"])
        for i in range(len(stepsSeries)):
            steps = steps + \
                str(pd.DataFrame(stepsSeries[i])["description"])
        recipes_df["content"] = recipes_df["content"] + \
            str(steps)
        return recipes_df