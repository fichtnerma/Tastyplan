from pydantic import BaseModel


class Step(BaseModel):
    stepCount: int
    description: str
