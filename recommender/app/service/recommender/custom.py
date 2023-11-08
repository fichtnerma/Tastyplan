import requests
import json

from app.models.user_context import UserContext

class CustomRecommender:
    def __init__(self, recipe_df):
        self.recipe_df = recipe_df

    def recommend(self, context: UserContext, k: int):
        return [1, 2, 3, 4, 5]
    