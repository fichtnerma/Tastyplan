# Recommendation System Analysis

Deep analysis of the Tastyplan recommendation approach, covering the Python recommender algorithm, NestJS backend integration, frontend UX, and concrete improvement opportunities.

---

## Table of Contents

1. [Current Architecture](#1-current-architecture)
2. [Algorithm Analysis](#2-algorithm-analysis)
3. [Critical Bugs](#3-critical-bugs)
4. [Integration Issues](#4-integration-issues)
5. [UX Gaps](#5-ux-gaps)
6. [Improvement Recommendations](#6-improvement-recommendations)

---

## 1. Current Architecture

### Data Flow

```
INITIALIZATION (app bootstrap):
  CSV/JSON ──→ PostgreSQL ──→ Redis ('ingredients', 'recipes')
  Each recipe ──→ POST /mapping ──→ Recommender (fuzzy ingredient matching)
  All recipes stored ──→ GET /initalize ──→ Recommender builds TF-IDF similarity matrix

RECIPE RECOMMENDATIONS (user swaps a recipe):
  Frontend ──→ GET /recipes/recommend/:id (JWT)
    ──→ RecipesService.getRecommendations(id, userId)
      ──→ GET recommender:5000/recommend/{id}?k=20
      ──→ RecipesFilterService.filterByQuery(preferences, recipeIds)
      ──→ shuffle ──→ take 5 ──→ hydrate from DB
    ←── Array of 5 full recipe objects

WEEKPLAN GENERATION:
  Frontend ──→ POST /weekplan/create (JWT)
    ──→ WeekplanService.createWeakplan(userId, dates, [])
      ──→ RecipesFilterService.filterByQuery(preferences)  ← NO recommender call
      ──→ shuffle ──→ assign to days (lunch/dinner)
    ←── Formatted weekplan
```

### Key Observation

The recommender is only used in **one place**: the "Change Recipe" modal's recommendation tab (`GET /recipes/recommend/:id`). Weekplan generation does **not** use the recommender — it relies solely on preference-based filtering + random shuffle.

### Technology Stack

| Component | Tech | Purpose |
|-----------|------|---------|
| Feature extraction | scikit-learn `TfidfVectorizer` | Bigram TF-IDF on recipe text |
| Similarity | scikit-learn `linear_kernel` | Cosine similarity (pairwise) |
| Ingredient matching | jellyfish + fuzzy_match | Jaro-Winkler, Damerau-Levenshtein, cosine, trigram |
| Data store | Redis | Shared data bus between NestJS and Python |
| Data processing | pandas | Recipe DataFrame normalization |

---

## 2. Algorithm Analysis

### 2.1 Content-Based Filtering via TF-IDF

The recommender uses a classical content-based approach:

1. Load all recipes from Redis into a pandas DataFrame
2. Build a `"content"` column by concatenating recipe name, tags, description, ingredients, and steps
3. Vectorize using TF-IDF with unigrams and bigrams (English stop words removed)
4. Compute pairwise cosine similarity matrix (`n × n`)
5. For a given recipe, return the top-k most similar recipes by cosine score

**File:** `recommender/app/api/recommendations/__init__.py`

```python
class Recommender():
    tfidf = TfidfVectorizer(ngram_range=(1, 2), stop_words="english")

    def get_similarity_matrix(self):
        tfidf_matrix = self.tfidf.fit_transform(self.recipes_df["name"])  # BUG: should be "content"
        similarity_matrix = linear_kernel(tfidf_matrix, tfidf_matrix)
        return similarity_matrix

    def recommendContentBased(self, recipe_id, k):
        similarity_score = list(enumerate(self.similarity_matrix[recipe_id]))
        similarity_score = sorted(similarity_score, key=lambda x: x[1], reverse=True)
        similarity_score = similarity_score[1:k + 1]
        recipe_indices = [i[0] for i in similarity_score]
        return [recipe_indices]
```

### 2.2 Ingredient Fuzzy Matching

The mapping system (`POST /mapping`) uses a weighted ensemble of four string similarity algorithms:

```
score = (cosine × 1.5 + damerau_levenshtein × 1.0 + jaro_winkler × 1.0 + trigram × 1.5) / 5
```

**Optimization shortcut**: If Jaro-Winkler ≥ 0.85, the other three metrics default to 1.0 (perfect), inflating the aggregate score.

### 2.3 Preference-Based Filtering (NestJS side)

After receiving recommendation IDs, the backend applies four filters:

1. **Diet compatibility** — `POSSIBLE_DIETS` map (vegan → `['vegan']`, vegetarian → `['vegan', 'vegetarian']`, etc.)
2. **Allergen exclusion** — Every ingredient must NOT contain user allergens
3. **Disliked ingredient exclusion** — Every ingredient must NOT be in user's dislike list
4. **System recipes only** — `userId: null` (excludes user-created recipes)

```typescript
// recipesFilter.service.ts
const recipes = await this.prismaService.recipe.findMany({
    where: {
        id: { in: recipeIds },
        formOfDiet: { in: POSSIBLE_DIETS.get(formOfDiet) },
        ingredients: {
            every: {
                ingredient: {
                    id: { notIn: dislikedIngredients },
                    NOT: { allergens: { hasSome: allergens } },
                },
            },
        },
        userId: null,
    },
    select: { id: true },
});
```

### 2.4 What the Algorithm Fundamentally Lacks

| Aspect | Current State | Impact |
|--------|--------------|--------|
| **User behavior** | Not tracked | No personalization based on what users actually cook/like |
| **Collaborative filtering** | None | Cannot surface "users like you also enjoyed X" |
| **Seasonal/temporal** | None | No awareness of season, recent history, or variety |
| **Nutritional balance** | None | No macro/calorie diversity across the week |
| **Cooking complexity** | Not factored | Cannot mix easy weeknight meals with weekend projects |
| **Ingredient reuse** | None | Shopping list not optimized for overlapping ingredients |
| **Ratings/feedback** | UI exists but not persisted | `RatingButton` component manages local state only |

---

## 3. Critical Bugs

### Bug 1: TF-IDF Uses Only Recipe Names (CRITICAL)

**File:** `recommender/app/api/recommendations/__init__.py:74`

```python
tfidf_matrix = self.tfidf.fit_transform(self.recipes_df["name"])  # ← BUG
```

Despite `groupFeatures()` building a rich `"content"` column from name + tags + description + ingredients + steps, the actual similarity computation uses **only the recipe name**. This means:
- Two recipes with completely different ingredients but similar names are considered similar
- Two recipes with identical ingredients but different names are considered dissimilar
- All the preprocessing work in `groupFeatures()` (lines 48-66) is wasted

**Fix:** Change `"name"` to `"content"`.

### Bug 2: `groupFeatures()` Concatenates Entire Series (CRITICAL)

**File:** `recommender/app/api/recommendations/__init__.py:49-66`

```python
def groupFeatures(self):
    self.recipes_df["content"] = (
        str(self.recipes_df["tags"]) + " " +       # ← Entire column as one string
        str(self.recipes_df["name"]) + " " +
        ...
    )
```

`str(self.recipes_df["tags"])` serializes the **entire pandas Series** (including index labels) into a single string. This same string is appended to **every row's** content column, making tags, ingredients, and steps useless for differentiation since every recipe gets identical text.

**Fix:** Use per-row operations:
```python
self.recipes_df["content"] = (
    self.recipes_df["tags"].apply(lambda x: ' '.join(x) if isinstance(x, list) else str(x)) + " " +
    self.recipes_df["name"] + " " +
    self.recipes_df["description"]
    # + per-row ingredient/step extraction
)
```

### Bug 3: Recipe ID Used as Positional Index (HIGH)

**File:** `recommender/app/api/recommendations/__init__.py:26`

```python
similarity_score = list(enumerate(self.similarity_matrix[recipe_id]))
```

`recipe_id` (a database ID) is used directly as a row index into the similarity matrix. If database IDs start at 1 (not 0), have gaps, or don't match DataFrame order, this returns **wrong recipes** or crashes with `IndexError`.

The `self.mapping` Series (ID → index mapping) is computed at line 70-71 but **never used**.

**Fix:**
```python
idx = self.mapping[recipe_id]
similarity_score = list(enumerate(self.similarity_matrix[idx]))
```

### Bug 4: Return Value Mismatch (HIGH)

`recommendContentBased()` returns **DataFrame positional indices**, but the NestJS consumer (`recipes.service.ts:145`) treats them as **database recipe IDs** for `filterByQuery(preferences, recipeIds)`. This causes the wrong recipes to be recommended.

**Fix:** Map indices back to database IDs before returning:
```python
recipe_ids = [int(self.recipes_df.iloc[i]["id"]) for i in recipe_indices]
return recipe_ids
```

### Bug 5: `POST /recommend` Endpoint Doesn't Exist (HIGH)

**File:** `api/src/weekplan/weekplan.service.ts:122-126`

The weekplan service calls `POST /recommend` with user history, but the Python recommender only exposes `GET /recommend/{item_id}`. This means **weekplan-based recommendations silently fail** and fall back to random shuffle of filtered recipes.

### Bug 6: Duplicate Recommendation Padding (MEDIUM)

**File:** `api/src/recipes/recipes.service.ts:153-155`

```typescript
if (fetchedMeals.length < k) {
    fetchedMeals = [...fetchedMeals, ...fetchedMeals, ...fetchedMeals, ...fetchedMeals];
}
```

When fewer than 5 recipes pass filtering, the list is duplicated 4x. After shuffle + slice, the user can see **the same recipe multiple times** in a single recommendation set.

### Bug 7: No Error Handling on Recommender Calls (MEDIUM)

**File:** `api/src/recipes/recipes.service.ts:143-145`

```typescript
const recommendedRecipeRes = await fetch(`${process.env.RECOMMENDER_URL}/recommend/${id}?k=${k * 4}`);
recommendedRecipeIds = (await recommendedRecipeRes.json())[0];
```

No check on response status. If the recommender is down, returns a non-200, or returns malformed JSON, the code crashes. There's no graceful fallback to non-recommendation-based suggestions.

### Bug 8: `parseRecipes()` Returns None Silently (MEDIUM)

**File:** `recommender/app/api/recommendations/__init__.py:78-83`

If Redis has no `'recipes'` key, the function returns `None`, crashing `preprocess()` when it calls `pd.json_normalize(None)`.

---

## 4. Integration Issues

### 4.1 No Recommendation Caching

Each call to `GET /recipes/recommend/:id` makes a fresh HTTP call to the Python recommender. Since the similarity matrix is static (computed once at initialization), the same recipe ID always returns the same results. These should be cached in Redis with a TTL matching the re-initialization interval.

### 4.2 Blocking Initialization

The `GET /initalize` endpoint runs synchronous CPU-intensive code (TF-IDF + matrix multiplication) inside an `async` handler, blocking the FastAPI event loop. During initialization, the service cannot serve any requests.

### 4.3 No Incremental Updates

Adding a new recipe (e.g., user-created) requires full re-initialization: reload all recipes from Redis and recompute the entire TF-IDF matrix and n×n similarity matrix. There's no incremental update path.

### 4.4 Hardcoded Scale Assumptions

```python
def __init__(self):
    self.similarity_matrix = np.empty([140, 140])  # ← hardcoded for ~140 recipes
```

The similarity matrix is pre-allocated for 140 recipes. While overwritten during init, it reveals the system was designed for a small, fixed catalog. The O(n²) matrix becomes problematic beyond ~10,000 recipes.

### 4.5 Race Conditions

The similarity matrix and DataFrame are instance attributes on a singleton with no locking. Concurrent reads during a re-initialization write could return corrupt results.

### 4.6 User-Created Recipes Excluded from Recommendations

`RecipesFilterService` filters with `userId: null`, meaning only system-seeded recipes are recommended. User-created recipes never appear in recommendations, limiting the system's value as the user base grows.

---

## 5. UX Gaps

### 5.1 Recommendation Surfaces

| Surface | Has Recommendations? | Type |
|---------|---------------------|------|
| Weekplan generation | No (random shuffle) | Should have |
| Change Recipe modal → "Recommendations" tab | Yes (content-based) | Only recommendation surface |
| Recipe detail page | No | Missing "similar recipes" |
| Cookbook / browse | No | Missing discovery |
| Homepage (logged in) | No | Missing personalized picks |
| Homepage (logged out) | Static hardcoded recipes | Not personalized |

The recommendation engine is only accessible through one UI path: weekplan → click swap on a recipe card → "Recommendations" tab. Users cannot discover new recipes through browsing, search enhancement, or homepage suggestions.

### 5.2 No Feedback Loop

The `RatingButton` component exists (`recipe/[id]/page.tsx`) with star ratings, but:
- Ratings are **local state only** — never sent to the backend
- No API endpoint for persisting ratings
- The recommender has no mechanism to consume user feedback
- No implicit feedback collection (e.g., which recipes users keep vs swap, cooking completions)

### 5.3 No Variety Enforcement

When regenerating a weekplan, there's no mechanism to ensure the new plan differs from the previous one. The same random shuffle could produce an identical or near-identical plan, especially with a small recipe catalog post-filtering.

### 5.4 "Generate New Plan" Discards Without Confirmation

The regenerate button (`POST /weekplan/createForDate` with `shouldReplace: true`) replaces the entire weekplan without confirming the user wants to lose their current selections and any individual recipe swaps they've made.

### 5.5 No Explanation of Recommendations

Users see "Recipes for you" with no explanation of why specific recipes were recommended. Adding transparency (e.g., "Because you liked Pasta Carbonara" or "Similar ingredients") would build trust and engagement.

---

## 6. Improvement Recommendations

### Phase 1: Fix Critical Bugs (Immediate)

These are correctness issues that must be fixed before any improvements have value.

#### 1.1 Fix TF-IDF Feature Column

**File:** `recommender/app/api/recommendations/__init__.py:74`

```python
# Before:
tfidf_matrix = self.tfidf.fit_transform(self.recipes_df["name"])

# After:
tfidf_matrix = self.tfidf.fit_transform(self.recipes_df["content"])
```

#### 1.2 Fix `groupFeatures()` to Operate Per-Row

```python
def groupFeatures(self):
    def extract_ingredient_names(ingredients):
        if isinstance(ingredients, list):
            return ' '.join(
                ing.get('ingredient', {}).get('name', '') if isinstance(ing, dict) else str(ing)
                for ing in ingredients
            )
        return ''

    def extract_step_descriptions(steps):
        if isinstance(steps, list):
            return ' '.join(
                s.get('description', '') if isinstance(s, dict) else str(s)
                for s in steps
            )
        return ''

    self.recipes_df["content"] = (
        self.recipes_df["name"].fillna('') + " " +
        self.recipes_df["tags"].apply(lambda x: ' '.join(x) if isinstance(x, list) else '') + " " +
        self.recipes_df["description"].fillna('') + " " +
        self.recipes_df["ingredients"].apply(extract_ingredient_names) + " " +
        self.recipes_df["steps"].apply(extract_step_descriptions)
    )
```

#### 1.3 Fix ID-to-Index Mapping

```python
def recommendContentBased(self, recipe_id, k):
    if recipe_id not in self.mapping:
        return [[]]
    idx = self.mapping[recipe_id]
    similarity_score = list(enumerate(self.similarity_matrix[idx]))
    similarity_score = sorted(similarity_score, key=lambda x: x[1], reverse=True)
    similarity_score = similarity_score[1:k + 1]

    # Map positional indices back to database IDs
    recipe_ids = [int(self.recipes_df.iloc[i[0]]["id"]) for i in similarity_score]
    return [recipe_ids]
```

#### 1.4 Add Error Handling in NestJS

```typescript
async getRecommendations(id: string, userId: string) {
    const k = 5;
    const preferences = await this.preferencesService.getPreferences(userId);

    let recommendedRecipeIds: number[] | undefined;
    try {
        const res = await fetch(`${process.env.RECOMMENDER_URL}/recommend/${id}?k=${k * 4}`);
        if (res.ok) {
            recommendedRecipeIds = (await res.json())[0];
        }
    } catch {
        // Recommender unavailable — fall back to filter-only
    }

    let { recipes: fetchedMeals } = await this.recipeFilterService.filterByQuery(
        preferences,
        recommendedRecipeIds,
    );

    // Deduplicate instead of blind duplication
    if (fetchedMeals.length < k) {
        const allFiltered = await this.recipeFilterService.filterByQuery(preferences);
        fetchedMeals = [...new Map([...fetchedMeals, ...allFiltered.recipes].map(r => [r.id, r])).values()];
    }

    return this.recipeQueries.findManyRecipesWithId(
        shuffleArray(fetchedMeals).slice(0, k).map(r => r.id)
    );
}
```

---

### Phase 2: Enrich the Feature Space (Short-term)

#### 2.1 Multi-Feature Similarity

Instead of a single TF-IDF on concatenated text, compute separate similarity signals and combine them:

```python
from sklearn.preprocessing import normalize

def calculate_similarities(self):
    # Text-based similarity (name + description + steps)
    text_features = self.recipes_df["name"] + " " + self.recipes_df["description"]
    tfidf_text = self.tfidf.fit_transform(text_features)
    sim_text = linear_kernel(tfidf_text, tfidf_text)

    # Ingredient-based similarity (ingredient names only)
    ingredient_text = self.recipes_df["ingredients"].apply(self._extract_ingredient_names)
    tfidf_ingredients = TfidfVectorizer(ngram_range=(1, 1)).fit_transform(ingredient_text)
    sim_ingredients = linear_kernel(tfidf_ingredients, tfidf_ingredients)

    # Tag-based similarity (categorical features)
    tag_text = self.recipes_df["tags"].apply(lambda x: ' '.join(x) if isinstance(x, list) else '')
    tfidf_tags = TfidfVectorizer().fit_transform(tag_text)
    sim_tags = linear_kernel(tfidf_tags, tfidf_tags)

    # Weighted combination
    self.similarity_matrix = (
        0.2 * sim_text +
        0.5 * sim_ingredients +  # Ingredients are the strongest signal
        0.3 * sim_tags
    )
```

#### 2.2 Add Nutritional and Structural Features

Encode additional recipe properties as numerical features:

```python
import numpy as np
from sklearn.preprocessing import MinMaxScaler

def add_numerical_features(self):
    numerical = self.recipes_df[['cookingTime', 'prepareTime', 'totalTime', 'servings']].fillna(0)
    scaled = MinMaxScaler().fit_transform(numerical)
    sim_numerical = scaled @ scaled.T
    # Blend with text-based similarity
    self.similarity_matrix = 0.8 * self.similarity_matrix + 0.2 * sim_numerical
```

#### 2.3 Diet-Aware Similarity

Currently diet filtering happens post-recommendation in NestJS. Bake diet compatibility into the similarity score to avoid wasting recommendation slots on incompatible recipes:

```python
# Boost similarity between recipes of compatible diets
diet_hierarchy = {'vegan': 0, 'vegetarian': 1, 'pescetarian': 2, 'omnivore': 3}
diet_scores = self.recipes_df['formOfDiet'].map(diet_hierarchy).values
diet_distance = np.abs(diet_scores[:, None] - diet_scores[None, :])
diet_penalty = 1 - (diet_distance / diet_distance.max())
self.similarity_matrix *= diet_penalty
```

---

### Phase 3: Add User Personalization (Medium-term)

#### 3.1 Persist User Ratings

1. Add a `Rating` model to Prisma schema:
   ```prisma
   model Rating {
     id       Int    @id @default(autoincrement())
     userId   String
     recipeId Int
     score    Int    // 1-5
     user     User   @relation(fields: [userId], references: [userId])
     recipe   Recipe @relation(fields: [recipeId], references: [id])
     @@unique([userId, recipeId])
   }
   ```

2. Create `POST /ratings` and `GET /ratings` API endpoints

3. Wire the existing frontend `RatingButton` component to persist ratings

#### 3.2 Track Implicit Signals

Capture behavioral data without requiring explicit ratings:

| Signal | Weight | Source |
|--------|--------|--------|
| Recipe kept in weekplan (not swapped) | +1 | Weekplan service |
| Recipe swapped away | -0.5 | `changeRecipe` endpoint |
| Recipe added to favorites | +2 | Favorites service |
| Recipe removed from favorites | -1 | Favorites service |
| Recipe viewed (detail page) | +0.3 | Frontend analytics |
| Recipe cooked (marked complete) | +3 | New feature |

#### 3.3 Implement Hybrid Recommendations

Combine content-based similarity with user preference signals:

```python
def recommend_hybrid(self, recipe_id, user_id, k):
    # Content-based component
    content_scores = self.similarity_matrix[self.mapping[recipe_id]]

    # User preference component (from rated/favorited recipes)
    user_profile = self.get_user_profile(user_id)  # weighted average of rated recipe vectors
    user_scores = linear_kernel(user_profile, self.tfidf_matrix).flatten()

    # Blend
    hybrid_scores = 0.6 * content_scores + 0.4 * user_scores

    # Exclude already seen/rated recipes
    seen = self.get_user_history(user_id)
    for idx in seen:
        hybrid_scores[idx] = -1

    top_k = np.argsort(hybrid_scores)[::-1][:k]
    return [int(self.recipes_df.iloc[i]["id"]) for i in top_k]
```

#### 3.4 Implement the Missing `POST /recommend` Endpoint

The weekplan service already calls this. Implement it:

```python
@app.post("/recommend")
async def recommend_for_weekplan(request: WeekplanRequest):
    """Given user history, recommend diverse recipes for a week."""
    history_ids = request.recipesFromHistory

    # Get recipes similar to history but not in history
    scores = np.zeros(len(recommender.recipes_df))
    for rid in history_ids:
        if rid in recommender.mapping:
            idx = recommender.mapping[rid]
            scores += recommender.similarity_matrix[idx]

    # Exclude history recipes
    for rid in history_ids:
        if rid in recommender.mapping:
            scores[recommender.mapping[rid]] = -1

    # Select top-N with diversity (MMR or greedy)
    selected = maximal_marginal_relevance(scores, recommender.similarity_matrix, k=14)
    return [int(recommender.recipes_df.iloc[i]["id"]) for i in selected]
```

---

### Phase 4: Weekplan Intelligence (Medium-term)

#### 4.1 Diversity-Aware Weekplan Generation

Instead of random shuffle, use Maximal Marginal Relevance (MMR) to ensure variety:

```python
def maximal_marginal_relevance(relevance_scores, similarity_matrix, k, lambda_=0.5):
    """Select k items balancing relevance and diversity."""
    selected = []
    candidates = list(range(len(relevance_scores)))

    for _ in range(k):
        best_score = -float('inf')
        best_idx = None
        for c in candidates:
            relevance = relevance_scores[c]
            redundancy = max(similarity_matrix[c][s] for s in selected) if selected else 0
            score = lambda_ * relevance - (1 - lambda_) * redundancy
            if score > best_score:
                best_score = score
                best_idx = c
        selected.append(best_idx)
        candidates.remove(best_idx)

    return selected
```

#### 4.2 Ingredient Overlap Optimization

Optimize the weekplan to reuse ingredients across days, reducing shopping list size:

```python
def optimize_ingredient_overlap(candidate_recipes, k):
    """Select recipes that share ingredients to minimize shopping."""
    # Score each pair by ingredient overlap
    # Use greedy selection: pick recipe, then prefer next recipe with most shared ingredients
    ...
```

#### 4.3 Nutritional Balancing

If nutritional data is available (some is in the ingredient CSV), balance macros across the week:

```python
def balance_nutrition(recipes, days):
    """Assign recipes to days ensuring nutritional variety."""
    # Avoid heavy meals on consecutive days
    # Balance protein/carb/fat ratios across the week
    ...
```

#### 4.4 Temporal Awareness

- **Seasonal ingredients**: Boost recipes using in-season produce
- **Day-of-week patterns**: Quick meals on weekdays, elaborate on weekends
- **History avoidance**: Don't repeat recent weekplan recipes for N weeks

---

### Phase 5: UX Enhancements (Short-to-Medium-term)

#### 5.1 Add "Similar Recipes" to Recipe Detail Page

Currently the recipe detail page (`/recipe/[id]`) shows no related recipes. Add a section:

```tsx
// recipe/[id]/page.tsx
const { data: similar } = useFetchWithAuth<Recipe[]>(`/service/recipes/recommend/${id}`);

return (
    <>
        {/* existing recipe content */}
        <section>
            <h2>Similar Recipes</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {similar?.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} smallCard />)}
            </div>
        </section>
    </>
);
```

#### 5.2 Add Personalized Homepage Section

For logged-in users, show "Recommended for You" on the homepage instead of static hardcoded recipes.

#### 5.3 Explain Recommendations

Add a `reason` field to recommendation responses:

```json
{
    "id": 42,
    "name": "Mushroom Risotto",
    "reason": "Similar ingredients to Pasta Carbonara"
}
```

#### 5.4 "Not Interested" / Dislike on Recommendations

Allow users to dismiss a recommendation, providing negative signal to the recommender and immediately showing a replacement.

#### 5.5 Recipe Discovery Page

Add a dedicated `/discover` or `/explore` page with:
- "Trending This Week" (most kept in weekplans)
- "New Recipes" (recently added)
- "Based on Your Favorites" (personalized)
- Category/tag browsing with recommendation ranking within categories

#### 5.6 Regeneration UX Improvements

- Add a confirmation dialog before "Generate New Plan"
- Allow "Lock" on individual recipe slots before regenerating (keep manually chosen recipes)
- Show a diff: "3 recipes changed" with before/after

---

### Phase 6: Scalability & Architecture (Long-term)

#### 6.1 Replace Full Similarity Matrix with ANN

For >1000 recipes, the O(n²) matrix becomes impractical. Use Approximate Nearest Neighbors:

```python
import faiss

def build_index(self):
    tfidf_matrix = self.tfidf.fit_transform(self.recipes_df["content"])
    dense = tfidf_matrix.toarray().astype('float32')
    faiss.normalize_L2(dense)
    self.index = faiss.IndexFlatIP(dense.shape[1])  # Inner product = cosine for normalized vectors
    self.index.add(dense)

def recommend(self, recipe_id, k):
    query = self.tfidf_matrix[self.mapping[recipe_id]].toarray().astype('float32')
    faiss.normalize_L2(query)
    scores, indices = self.index.search(query, k + 1)
    return [int(self.recipes_df.iloc[i]["id"]) for i in indices[0] if i != self.mapping[recipe_id]][:k]
```

#### 6.2 Move to Embedding-Based Similarity

Replace TF-IDF with semantic embeddings for better understanding of recipe content:

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode(recipes_df["content"].tolist())
# Use FAISS for efficient similarity search on embeddings
```

This captures semantic similarity (e.g., "grilled chicken" ≈ "roasted poultry") that TF-IDF misses.

#### 6.3 Incremental Updates

Support adding new recipes without full recomputation:

```python
def add_recipe(self, recipe):
    # Vectorize the new recipe
    new_vector = self.tfidf.transform([recipe["content"]])
    # Compute similarity against existing recipes
    new_similarities = linear_kernel(new_vector, self.tfidf_matrix)
    # Append to matrix
    self.similarity_matrix = np.vstack([self.similarity_matrix, new_similarities])
    new_col = np.append(new_similarities.flatten(), 1.0)  # self-similarity = 1
    self.similarity_matrix = np.column_stack([self.similarity_matrix, new_col])
```

#### 6.4 Cache Recommendation Results

```typescript
// recipes.service.ts
async getRecommendations(id: string, userId: string) {
    const cacheKey = `recommend:${id}:${userId}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    // ... compute recommendations ...

    await this.cacheManager.set(cacheKey, recipes, 3600); // 1 hour TTL
    return recipes;
}
```

#### 6.5 Async Initialization

```python
import asyncio
from concurrent.futures import ProcessPoolExecutor

executor = ProcessPoolExecutor(max_workers=1)

@app.get("/initalize")
async def initalize():
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(executor, recommender.initalize)
    return {"status": "initialized"}
```

---

## Summary: Impact vs Effort Matrix

| Improvement | Impact | Effort | Phase |
|-------------|--------|--------|-------|
| Fix TF-IDF column bug | **Critical** | Trivial | 1 |
| Fix `groupFeatures()` per-row | **Critical** | Low | 1 |
| Fix ID-to-index mapping | **Critical** | Low | 1 |
| Fix return value (indices → IDs) | **Critical** | Low | 1 |
| Add error handling on recommender calls | High | Low | 1 |
| Implement `POST /recommend` endpoint | High | Medium | 1 |
| Multi-feature similarity (ingredients, tags, text) | High | Medium | 2 |
| Cache recommendation results | Medium | Low | 2 |
| Persist user ratings | High | Medium | 3 |
| Track implicit signals | High | Medium | 3 |
| "Similar Recipes" on detail page | Medium | Low | 5 |
| Diversity-aware weekplan (MMR) | High | Medium | 4 |
| Ingredient overlap optimization | Medium | High | 4 |
| Hybrid recommendations (content + collaborative) | Very High | High | 3 |
| Recipe discovery page | Medium | Medium | 5 |
| Recommendation explanations | Medium | Medium | 5 |
| Embedding-based similarity | High | Medium | 6 |
| FAISS/ANN for scalability | Medium | Medium | 6 |
| Incremental updates | Medium | Medium | 6 |
| Async initialization | Low | Low | 6 |
