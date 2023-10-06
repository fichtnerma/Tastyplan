from app.models.ingredients import Ingredient
from app.models.step import Step
from pydantic import BaseModel
from typing import List, Optional


class Recipe(BaseModel):
    tags: List[str]
    name: str
    description: str
    cookingTime: Optional[str] = None
    totalTime: Optional[str] = None
    ingredients: List[Ingredient]
    steps: List[Step]
    formOfDiet: Optional[str] = None
    prepareTime: Optional[str] = None
