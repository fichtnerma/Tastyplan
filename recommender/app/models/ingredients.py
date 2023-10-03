from pydantic import BaseModel


class Ingredient(BaseModel):
    quantity: str
    unit: str
    name: str
