import ast
import re
import string
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


def ingredient_parser(ingredients):
    # common words (already lemmatized)
    words_to_remove = ['fresh', 'oil', 'a', 'red', 'bunch', ...]
    # Turn ingredient list from string into a list
    if isinstance(ingredients, list):
        ingredients = ingredients
    else:
        ingredients = ast.literal_eval(ingredients)
    # We first get rid of all the punctuation
    translator = str.maketrans('', '', string.punctuation)
    # initialize nltk's lemmatizer
    lemmatizer = WordNetLemmatizer()
    ingred_list = []
    for i in ingredients:
        i.translate(translator)
        # We split up with hyphens as well as spaces
        items = re.split(' |-', i)
        # Get rid of words containing non alphabet letters
        items = [word for word in items if word.isalpha()]
        # Turn everything to lowercase
        items = [word.lower() for word in items]
        # Lemmatize words so we can compare words to measuring words
        items = [lemmatizer.lemmatize(word) for word in items]
        # get rid of stop words
        stop_words = set(stopwords.words('english'))
        items = [word for word in items if word not in stop_words]
        # Get rid of common easy words
        items = [word for word in items if word not in words_to_remove]
        if items:
            ingred_list.append(' '.join(items))
    return ingred_list
