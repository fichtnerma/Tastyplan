from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import linear_kernel
from app.models.recipe import Recipe
from typing import List
import pandas as pd
import numpy as np
import redis
import json


class Recommender():
    cache = redis.Redis(host='redis', port=6379)
    tfidf = TfidfVectorizer(ngram_range=(
        1, 2), stop_words="english")

    def __init__(self):
        self.similarity_matrix = np.empty([140, 140])

    def initalize(self):
        recipes = self.parseRecipes()
        self.preprocess(recipes)
        self.calculate_similarities()

    def recommendContentBased(self, recipe_id, k: int):
        recipe_indices = []
        similarity_score = list(enumerate(self.similarity_matrix[recipe_id]))
        similarity_score = sorted(
            similarity_score, key=lambda x: x[1], reverse=True)
        similarity_score = similarity_score[1:k + 1]

        recipe_indices.append([i[0] for i in similarity_score])
        return recipe_indices

    def preprocess(self, recipes: List[Recipe]):
        self.recipes_df = pd.json_normalize(recipes)
        self.groupFeatures()
        self.recipes_df["content"] = self.recipes_df["content"].apply(
            lambda x: x.lower())
        self.recipes_df["content"] = self.recipes_df["content"].apply(
            lambda x: x.replace("[", ''))
        self.recipes_df["content"] = self.recipes_df["content"].apply(
            lambda x: x.replace("]", ''))
        self.recipes_df["content"] = self.recipes_df["content"].apply(
            lambda x: x.replace(',', ''))
        self.recipes_df["content"] = self.recipes_df["content"].apply(
            lambda x: x.replace('.', ''))

    def groupFeatures(self):
        self.recipes_df["content"] = self.recipes_df["name"] + " " + \
            str(self.recipes_df["tags"]) + " " + self.recipes_df["description"]
        ingredients = ""
        ingredientsSeries = pd.Series(self.recipes_df["ingredients"])
        for i in range(len(ingredientsSeries)):
            ingredients = ingredients + \
                str(pd.DataFrame(ingredientsSeries[i])["name"])

        self.recipes_df["content"] = self.recipes_df["content"] + \
            str(ingredients)

        steps = ""
        stepsSeries = pd.Series(self.recipes_df["steps"])
        for i in range(len(stepsSeries)):
            steps = steps + \
                str(pd.DataFrame(stepsSeries[i])["description"])
        self.recipes_df["content"] = self.recipes_df["content"] + \
            str(steps)

    def calculate_similarities(self):
        self.similarity_matrix = self.get_similarity_matrix()
        self.mapping = (pd.Series(self.recipes_df.index,
                                  index=self.recipes_df["id"]))

    def get_similarity_matrix(self):
        tfidf_matrix = self.tfidf.fit_transform(self.recipes_df["name"])
        similarity_matrix = linear_kernel(tfidf_matrix, tfidf_matrix)
        return similarity_matrix

    def parseRecipes(self):
        data = self.cache.get('recipes')
        # Parse the JSON data
        if data:
            data = json.loads(data.decode('utf-8'))
            return data
