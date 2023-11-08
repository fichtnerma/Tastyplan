import logging
from typing import Union
from app.service.recommender import Recommender
from app.service.mapping import Mapping
from fastapi import FastAPI
from app.models.recipe import Recipe
from app.models.user_context import UserContext

# setup logger
logging.config.fileConfig('logging.conf', disable_existing_loggers=False)
# get root logger
# the __name__ resolve to "main" since we are at the root of the project.
logger = logging.getLogger(__name__)
# This will get the root logger since no logger in the configuration has this name.

app = FastAPI(root_path="/api")

mapping = Mapping()
recommender = Recommender()


@app.post("/mapping")
async def map_ingredients(recipeJson: Recipe):
    return mapping.parseIngredients(recipeJson)


@app.get("/recommend/{item_id}")
async def recommend_recipes(item_id: int, k: Union[int, None] = 5):
    return recommender.recommendSimilarRecipes(item_id, k)

@app.post("/recommend")
async def recommend_recipes_by_history(input: UserContext):
    return recommender.recommendRecipesBasedOnHistory(input)


@app.get("/initalize")
async def initalize():
    recommender.initalize()
    return
