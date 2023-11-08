class Recommendation:
    def __init__(self, recipe_id, score):
        self.recipe_id = recipe_id
        self.score = score
    
    def __eq__(self, other):
        return self.recipe_id == other.recipe_id
    
    def __hash__(self):
        return hash(('recipe_id', self.recipe_id))