import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

from app.models.recommendation import Recommendation

class ContentBasedRecommender:
    tfidf = TfidfVectorizer(ngram_range=(
        1, 2), stop_words="english")
    
    def __init__(self, recipes_df: pd.DataFrame):
        self.recipes_df = recipes_df
        self.similarity_matrix = np.empty([140, 140])
        self.__calculate_similarities()

    def __calculate_similarities(self):
        self.similarity_matrix = self.__get_similarity_matrix()
        self.mapping = (pd.Series(self.recipes_df.index,
                                  index=self.recipes_df["id"]))

    def __get_similarity_matrix(self):
        tfidf_matrix = self.tfidf.fit_transform(self.recipes_df["name"])
        similarity_matrix = linear_kernel(tfidf_matrix, tfidf_matrix)
        return similarity_matrix
    
    def recommendContentBased(self, recipe_id, k: int):
        recipe_indices = []
        similarity_score = list(enumerate(self.similarity_matrix[recipe_id]))
        similarity_score = sorted(
            similarity_score, key=lambda x: x[1], reverse=True)
        similarity_score = similarity_score[1:k + 1]
        
        for i in similarity_score:
            recipe_indices.append(Recommendation(i[0], i[1]))
        return recipe_indices