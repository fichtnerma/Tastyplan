from app.service.recommender.content_based import ContentBasedRecommender
from app.service.recommender.preprocess import Preprocessor
from app.service.recommender.custom import CustomRecommender
import redis
import json
from itertools import chain

from app.models.user_context import UserContext



class Recommender():
    cache = redis.Redis(host='redis', port=6379)
    preprocesser = Preprocessor()
    contentBasedRecommender = None
    customRecommender = None

    def initalize(self):
        print("Initalizing Recommender")
        recipes = self.parseRecipes()
        self.recipes_df = self.preprocesser.preprocess(recipes)
        self.contentBasedRecommender = ContentBasedRecommender(self.recipes_df)
        self.customRecommender = CustomRecommender(self.recipes_df)



    def parseRecipes(self):
        data = self.cache.get('recipes')
        if data:
            data = json.loads(data.decode('utf-8'))
            return data

    def recommendSimilarRecipes(self, recipe_id, k: int):
        return self.contentBasedRecommender.recommendContentBased(recipe_id, k)
    
    def recommendRecipesByContext(self, input: UserContext, k: int):
        return self.customRecommender.recommend(input, k)
    
    def recommendRecipesBasedOnHistory(self, input: UserContext):
        all_recommendations = []
        for recipe in input.recipesFromHistory:
            recipe_id = recipe
            all_recommendations.append(self.contentBasedRecommender.recommendContentBased(recipe_id, 10))

        all_recommendations = list(chain.from_iterable(all_recommendations))
        all_recommendations = list(set(all_recommendations))
        all_recommendations.sort(key=lambda x: x.score, reverse=True)
        all_recommendations = all_recommendations.filter(lambda x: x.recipe_id not in input.recipesFromHistory)
        return all_recommendations
    