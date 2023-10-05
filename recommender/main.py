import logging
from typing import Union
from app.api.recommendations import Recommender
from app.api.mapping import Mapping
from fastapi import FastAPI
from app.models.recipe import Recipe

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
    return recommender.recommendContentBased(item_id, k)


@app.get("/initalize")
async def initalize():
    recommender.initalize()
    return
