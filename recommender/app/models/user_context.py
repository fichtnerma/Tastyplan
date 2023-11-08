from app.models.recipe import Recipe
from pydantic import BaseModel
from typing import List


class UserContext(BaseModel):
    userId: str
    recipesFromHistory: List[int]
