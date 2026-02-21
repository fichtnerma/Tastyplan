# Tastyplan Code Analysis Report

Comprehensive code quality analysis covering security, performance, best practices, and infrastructure.

---

## Table of Contents

1. [Critical Security Issues](#1-critical-security-issues)
2. [Backend Issues](#2-backend-issues)
3. [Frontend Issues](#3-frontend-issues)
4. [Infrastructure & DevOps](#4-infrastructure--devops)
5. [Priority Summary](#5-priority-summary)

---

## 1. Critical Security Issues

These issues should be addressed immediately as they pose significant security risks.

### 1.1 Hardcoded Secrets in Source Code

| File | Line | Issue |
|------|------|-------|
| `api/src/app.module.ts` | 28-34 | Gmail app password hardcoded: `pass: 'eblsczadxufcvizi'` |
| `frontend/src/pages/api/auth/[...nextauth].ts` | 7 | NextAuth secret hardcoded: `secret: 'qY6aYs7lKasdgxuoEhQOMJiahxL56OzcGS+lXZlaUo4='` |
| `.env` | entire file | Committed to git with `POSTGRES_PASSWORD`, `SECRET_KEY`, `ELASTIC_PASSWORD` |
| `api/.env` | entire file | AWS credential placeholders committed to git |

**Impact:** Anyone with repository access can forge authentication tokens, access databases, and compromise email accounts.

**Fix:** Move all secrets to environment variables, add `.env` to `.gitignore`, create `.env.example` files, and rotate all exposed credentials.

### 1.2 JWT Tokens Never Expire

**File:** `api/src/auth/jwt.strategy.ts:12`
```typescript
ignoreExpiration: true,  // Tokens NEVER expire
```

**Impact:** A stolen token provides permanent access to the user's account.

**Fix:** Set `ignoreExpiration: false` and configure a reasonable expiration time.

### 1.3 JWT Secret Potentially Undefined

**File:** `api/src/auth/auth.module.ts:20`, `api/src/auth/jwt.strategy.ts:13`

`process.env.SECRET_KEY` is read at module load time instead of using `registerAsync` with `ConfigService`. If the env var isn't set, JWT signing uses `undefined` as the secret.

### 1.4 SSL Private Key Baked Into Docker Image

**File:** `reverseproxy/nginx.Dockerfile:4-6`
```dockerfile
COPY tastyplan.de.key /etc/ssl/private/tastyplan.de.key
```

**Impact:** Anyone with image access can extract the private key.

**Fix:** Mount certificates via Docker secrets or volumes at runtime.

### 1.5 Wide-Open CORS

**File:** `api/src/main.ts:15`
```typescript
app.enableCors();  // Allows ALL origins
```

**Fix:** Restrict to specific allowed origins: `app.enableCors({ origin: ['https://tastyplan.de'] })`.

### 1.6 Password Logged in Plaintext

**File:** `api/src/users/users.queries.ts:60`
```typescript
console.log('userId', userId, 'newPassword', newPassword);
```

---

## 2. Backend Issues

### 2.1 Security

#### Missing Auth Guards

| Endpoint | File | Line |
|----------|------|------|
| `POST /recipes/create` | `api/src/recipes/recipes.controller.ts` | 55 |
| `GET /recipes/:id` | `api/src/recipes/recipes.controller.ts` | 83 |
| `GET /recipes?search=` | `api/src/recipes/recipes.controller.ts` | 92 |
| `GET /ingredients` | `api/src/ingredients/ingredients.controller.ts` | 14 |
| `GET /ingredients/all` | `api/src/ingredients/ingredients.controller.ts` | 23 |

The `POST /recipes/create` endpoint is particularly dangerous: the `userId` comes from the request body, meaning anyone can create recipes on behalf of other users.

#### Registration Bypasses Validation

**File:** `api/src/auth/auth.controller.ts:15-16`

The register endpoint uses `request.body` directly instead of `@Body() dto: CreateUserDto`, bypassing the global `ValidationPipe` entirely.

#### No Password Strength Validation

**File:** `api/src/users/dto/create-user.dto.ts:12-13`

No `@MinLength()` or `@Matches()` — users can register with single-character passwords.

#### Guest Login Exposes Password Hash

**File:** `api/src/auth/auth.service.ts:18-28`

`continueAsGuest()` returns the full user object including the password hash, unlike `login()` which properly strips it.

#### S3 Buckets Public by Default

**File:** `api/src/recipes/recipesUploadImage.service.ts:84`
```typescript
ACL: 'public-read',
```

### 2.2 Error Handling

#### Generic "Error message" in Every Controller

Every catch block across all controllers throws the same useless string:
```typescript
throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
```

**Affected files:** `auth.controller.ts`, `recipes.controller.ts`, `favorites.controller.ts`, `preferences.controller.ts`, `weekplan.controller.ts`, `ingredients.controller.ts` — approximately 20+ instances total.

**Impact:** Login failures (401) become indistinguishable from server errors (500). Debugging is impossible.

#### Auth Error Chain Swallows Specific Errors

`users.service.ts:54-74` → `findByLogin()` throws `HttpException('invalid_credentials', 401)` inside a try block, then its own catch block catches it and re-throws as a 500. The auth controller then catches *that* and re-throws as yet another generic 500.

#### `continueAsGuest` Returns Error Object Instead of Throwing

**File:** `api/src/auth/auth.service.ts:18-29`

On error, returns `{ success: false, message: error }` instead of throwing. The controller then tries to destructure `{ token, data }` from this, producing undefined values.

#### Empty Catch Blocks

**File:** `api/src/ingredients/ingredientsSearch.service.ts:24-29` — Elasticsearch index creation failures are silently swallowed.

#### `throwError` from rxjs Does Nothing

**File:** `api/src/ingredients/ingredients.service.ts:36`
```typescript
throwError(() => new Error('No ingredients found'));
```
`throwError` returns an Observable; in an async function it has no effect. Should be `throw new NotFoundException(...)`.

#### Image Resize Result Discarded

**File:** `api/src/recipes/recipesUploadImage.service.ts:48-68`

`resizeAndCropImage()` returns `undefined` on error (no return, no throw), and the caller at `recipes.service.ts:178` discards the return value entirely, always using the original buffer.

### 2.3 Code Organization

#### Duplicate Registrations

| Issue | File |
|-------|------|
| `PreferencesController` registered in both `AppModule` and `PreferencesModule` | `app.module.ts:72` |
| `RecipesModule` imported twice in `WeekplanModule` | `weekplan.module.ts:9` |
| `PreferencesService` provided in both `RecipesModule` and `PreferencesModule` | `recipes.module.ts:23` |
| `PrismaService` provided redundantly (already global) | `users.module.ts:9`, `auth.module.ts:27` |
| `json({ limit: '10mb' })` middleware registered twice | `main.ts:17,29` |

#### Duplicated S3 Client Creation

**File:** `api/src/recipes/recipesUploadImage.service.ts` — S3 client created in both `createS3Object()` (line 70) and inline in `deleteImageFromS3()` (line 28).

### 2.4 TypeScript Issues

- **`any` types** in `jwt-auth.guard.ts:9-11`
- **Unsafe `as User` casts** across all controllers (10+ instances) — the `RequestWithUser` type has different properties than the Prisma `User` model
- **Non-null assertions** on image metadata in `recipesUploadImage.service.ts:54-55`
- **`require()` instead of ES imports** in `main.ts:11`, `initializer.service.ts:10-12`
- **String IDs parsed with `parseInt` everywhere** — DTOs should declare numeric fields as `number` with `@IsInt()`

### 2.5 NestJS Best Practices

#### DTOs Without Validation Decorators

The following DTOs have zero class-validator decorators, making the `ValidationPipe` useless:

| DTO File | Missing Decorators |
|----------|-------------------|
| `favorites/dto/add-favorite.dto.ts` | All fields |
| `weekplan/dto/change-recipe.dto.ts` | All fields |
| `weekplan/dto/create-by-date.dto.ts` | All fields |
| `recipes/dto/create-recipe.dto.ts` | All fields |
| `recipes/dto/filter-recipe.dto.ts` | All fields |
| `users/dto/create-user.dto.ts` (ResetPasswordDto) | All fields |

#### ValidationPipe Missing Options

**File:** `api/src/main.ts:16`
```typescript
app.useGlobalPipes(new ValidationPipe());  // Missing whitelist, forbidNonWhitelisted, transform
```

#### `@nestjs/mapped-types` Pinned to `*`

**File:** `api/package.json:39` — Accepts any version including major breaking changes.

### 2.6 Performance

#### N+1 Queries

**File:** `api/src/preferences/preferences.service.ts:11-16` — Fires N individual `findUnique` queries instead of a single `findMany` with `where: { id: { in: [...ids] } }`.

#### Full Table Scans Without Pagination

| Query | File |
|-------|------|
| All recipes with steps and ingredients | `recipe.queries.ts:65-80` |
| All ingredients | `ingredients.queries.ts:30-32` |
| All user weekplans | `weekplan.queries.ts:8-22` |

#### Missing Database Indexes

No `@@index` directives in `prisma/schema.prisma` for commonly queried fields: `Weekplan.userId`, `Favorites.userId`, `Recipe.formOfDiet`, `Recipe.userId`.

#### Sequential Processing in Initializer

`initializer.service.ts:50-54` processes recipes one at a time (including HTTP calls to the recommender service). Should use batched `Promise.all`.

### 2.7 Testing Gaps

#### Placeholder Tests
- `auth.controller.spec.ts:36-38`: `expect(true).toBeTruthy()`
- `cronjobs.service.ts:13-15`: `expect(true).toBe(true)`

#### Missing Test Files Entirely
No tests for: `UsersService`, `UsersQueries`, `RecipeQueries`, `WeekplanQueries`, `PreferencesQueries`, `PrismaService`, `RecipesFilterService`, `HealthController`, `CronjobsService`.

#### Tests That Can't Fail
Controller error tests use try-catch without `expect.assertions()` — if the method doesn't throw, the test silently passes. Found in 18+ test cases across all controller specs.

#### Test Description Mismatch
`recipes.controller.spec.ts:26`: Describe block says `'UsersController'` but tests `RecipesController`.

---

## 3. Frontend Issues

### 3.1 Security

#### Unvalidated User Input in URLs

Missing `encodeURIComponent()` on search parameters:
- `SearchSection.tsx:18`
- `Dislikes.tsx:125`
- `PreferencesSettings.tsx:84`
- `IngredientSearch.tsx:20`

#### Cookies Without Security Flags

**File:** `CookieBanner.tsx:23,29` — Missing `Secure`, `SameSite`, and `HttpOnly` attributes.

### 3.2 React Issues

#### Bug: `remove` Calls Wrong Endpoint

**File:** `frontend/src/hooks/useFavorites.ts:31-39`
```typescript
remove: (recipeId, session) => {
    fetchWithAuth('/service/favorites/add', ...);  // BUG: should be remove endpoint
```

#### Debounce Creates New Instance Per Keystroke

**Files:** `Dislikes.tsx:133-137`, `PreferencesSettings.tsx:72-76`
```typescript
const debouncedHandler = debounce(() => handleSearch(value), 250);  // New instance every call
debouncedHandler();
```
This defeats debouncing entirely — every keystroke still fires after 250ms.

#### Missing `useCallback` on Functions Passed as Props

`weekOverview/page.tsx` — `generateNewWeek`, `showNextWeek`, `showPreviousWeek` recreated every render.

#### Stale Closure / No Rollback on Optimistic Updates

`useFavorites.ts:20-29` — State updates optimistically before the network request completes, with no error handling or rollback.

#### `useEffect` Dependency Issues

- `setup/page.tsx:42-44`: `setLogoLinkTarget` missing from deps
- `RecipeCard.tsx:42-45`: `isFavorite` in deps causes unnecessary re-runs; favorites can never be unmarked

#### Middleware Logic Bug

**File:** `frontend/src/middleware.ts:22-29`

`requireSetupPaths` (`/weekOverview`, `/shoppingList`) are already in `protectedPaths`, so the `else if` for setup check never executes. Users who haven't completed setup can access these routes.

### 3.3 TypeScript Issues

- **11+ `@ts-ignore` directives** instead of proper generics (e.g., `IngredientSearch.tsx`, `Keyfacts.tsx`)
- **`as unknown as` double-casts** in 4 locations to bypass `useFetchWithAuth` generics
- **Duplicate `Preferences` interface** defined identically in `settings/page.tsx` and `setup/page.tsx`
- **Local types shadow globals**: `Ingredient` and `Step` in `addRecipe/page.tsx` shadow `types/types.ts`
- **Custom `ReturnType` shadows built-in**: `fetchWithAuth.ts:40`

### 3.4 Performance

#### No Lazy Loading

No `React.lazy()` or `next/dynamic` used anywhere. Heavy components like `ChangeRecipeModal` and `Swiper` are statically imported by every `RecipeCard`.

#### Image Optimization Disabled

**File:** `frontend/next.config.js:13`
```javascript
images: { unoptimized: true }
```
Disables all Next.js image optimization (WebP, resizing, lazy loading).

#### Unthrottled Scroll Listener

**File:** `MainHeader.tsx:21-29` — Scroll handler fires state update on every scroll event without throttling.

#### Duplicate CSS Imports

**File:** `weekOverview/page.tsx` — `swiper/css` imported twice; `swiper-bundle.css` includes all module CSS already imported individually.

### 3.5 Accessibility

#### Hardcoded Alt Text

| File | Alt Text | Issue |
|------|----------|-------|
| `recipe/[id]/page.tsx:41` | `"Pancakes Bild"` | Same alt for ALL recipes |
| `DetailView.tsx:54` | `"Pancakes Bild"` | Same alt for ALL recipes |
| `CardContent.tsx:23` | `"Food Img"` | Generic for all cards |

#### Broken Keyboard Navigation

- `DetailView.tsx:41`: `hideDetailView` referenced but never called (missing `()`)
- 10+ locations filter only `Tab`/`Shift` instead of activating on `Enter`/`Space`

#### Missing ARIA / Semantic Issues

- `AddSteps.tsx:51`: `aria-label="button"` (non-descriptive)
- `AddSteps.tsx:33`: Empty `role=""` attribute
- `layout.tsx:14-16`: `<meta>` tag outside `<head>` element
- Form inputs lack `aria-invalid` and `aria-describedby`

#### CSS Bug in Error Display

**File:** `NumberInput.tsx:72`
```typescript
className={`${errorMessage} ? '' : 'hidden'} text-red-custom ...`}
```
Ternary is inside template literal string but not evaluated as JS — error messages are never hidden.

### 3.6 Error Handling

#### No Error Boundaries

The entire application has zero Error Boundary components. Any render error crashes the app with a white screen.

#### Empty Catch Blocks

`ChangeRecipeModal.tsx:55-57` and `DetailView.tsx:24-26` silently swallow JSON parse errors.

#### Unhandled Promise Rejections

API fetches without `.catch()` or try-catch in: `useWeekplan.ts`, `SearchSection.tsx`, `RecommendSection.tsx`, `OwnRecipes.tsx`, `shoppingList/page.tsx`.

#### Fire-and-Forget API Calls

`settings/page.tsx:58-68` — `saveSettings` doesn't await the fetch but shows "Settings saved!" toast immediately.

### 3.7 Code Organization

#### Large Components

| Component | Lines | Issues |
|-----------|-------|--------|
| `PreferencesSettings.tsx` | 335 | Mixes data fetching, business logic, and UI |
| `setup/page.tsx` | 232 | Same preferences object rebuilt 4 times with all fields spread |
| `ChangeRecipeModal.tsx` | 226 | Data fetching + state + UI |
| `weekOverview/page.tsx` | 200 | Multiple concerns |

#### Duplicated Data Arrays

- `foodDietPreferences` defined identically in `FoodLifestyle.tsx` and `PreferencesSettings.tsx`
- `intolerances` arrays differ between `Intolerances.tsx` (`"milk"`) and `PreferencesSettings.tsx` (`"lactose"`) — potential bug

#### Dead Code

29 lines of commented-out code in `fetchWithAuth.ts`, plus significant commented-out blocks in `Steps.tsx`, `AddIngredients.tsx`, `settings/page.tsx`, `weekOverview/page.tsx`.

#### User-Facing Typo

`Keyfacts.tsx:14`: `"Vegatarian"` should be `"Vegetarian"`.

---

## 4. Infrastructure & DevOps

### 4.1 Docker

#### Outdated Base Images

All Dockerfiles use Node 18 (EOL April 2025). Upgrade to Node 20 or 22 LTS.

**Recommender:** `Dockerfile` uses `python:3.9-slim` but `Pipfile` specifies `python_version = "3.11"`.

#### API Dockerfile Issues (`api/Dockerfile`)

- `USER node` set in build stage, not production stage (runs as root in production)
- No `WORKDIR` in production stage
- `npm ci --only=production` is deprecated (use `--omit=dev`)
- Missing `HEALTHCHECK` and `EXPOSE`

#### Frontend Not Using Standalone Output (`frontend/Dockerfile`)

Next.js `output: 'standalone'` is configured but the Dockerfile copies `node_modules` instead of using the standalone build. This inflates image size from ~100MB to ~1GB.

#### Recommender Issues (`recommender/Dockerfile`)

- `gcc` installed but never cleaned up
- No `.dockerignore` file
- No non-root user

### 4.2 Nginx (`reverseproxy/nginx.conf`)

#### Missing Security Headers

No `X-Frame-Options`, `X-Content-Type-Options`, `Content-Security-Policy`, `Strict-Transport-Security`, or `Permissions-Policy`.

#### Weak SSL Configuration

Missing: `ssl_protocols`, `ssl_ciphers`, `ssl_prefer_server_ciphers`, OCSP stapling.

#### No Compression

No gzip or Brotli compression configured.

#### No Static Asset Caching

No `Cache-Control` headers for `/_next/static/` assets.

#### No Rate Limiting

No `limit_req_zone` configured.

#### Other

- `worker_processes 1` instead of `auto`
- Empty `events {}` block
- API not routed through nginx (bypasses SSL termination)

### 4.3 CI/CD (`.gitlab-ci.yml`)

- **Zero-downtime deployment absent**: `down` then `up` causes full outage between commands
- **No Docker layer caching**: Every CI build rebuilds from scratch
- **No container vulnerability scanning**
- **E2E tests only run on MR to master**, not `dev`
- **No test coverage thresholds**

### 4.4 Docker Compose

- Elasticsearch healthcheck waits for `green` (impossible with single node — use `yellow`)
- API healthcheck allows 100 retries × 10s = 16+ minutes of unhealthiness
- Redis and Postgres ports exposed to host (should be internal-only in production)
- No resource limits on any container
- Orphaned `pgadmin-data` volume

### 4.5 Package Dependencies

#### API

| Package | Issue |
|---------|-------|
| `@nestjs/common` ^9.0.0 | NestJS 9 unmaintained; v10/v11 available |
| `@nestjs/cli` ^10.3.0 | Version mismatch with framework v9 |
| `aws-sdk` ^2.1512.0 | v2 deprecated; migrate to `@aws-sdk/client-s3` |
| `crypto` ^1.0.1 | Built into Node.js; npm package is deprecated shim |
| `@nestjs/mapped-types` * | Wildcard version accepts breaking changes |
| `@prisma/client` ^4.15.0 vs `prisma` ^4.10.1 | Version mismatch; Prisma v4 unmaintained |
| `@nestjs/cache-manager` ^2.1.0 | Deprecated in NestJS v10 |
| `@types/bcrypt`, `@types/cookie-parser` | In `dependencies`, should be `devDependencies` |

#### Frontend

| Package | Issue |
|---------|-------|
| `next` ^13.4.11 | Next.js 13 unmaintained; no security patches |
| `@next/font` 13.5.6 | Deprecated; moved to `next/font` |
| `jest-dom` ^4.0.0 | Deprecated; `@testing-library/jest-dom` already installed |
| `next-pwa` ^5.6.0 | Abandoned; use `@ducanh2912/next-pwa` or `serwist` |

#### Root

- `cypress-real-events` in `dependencies` (should be `devDependencies`)
- `nest-schedule` deprecated (`@nestjs/schedule` already used in API)
- `preinstall` script uses `npm install` instead of `npm ci`

### 4.6 TypeScript Configuration

#### API (`api/tsconfig.json`)

| Setting | Value | Recommended |
|---------|-------|-------------|
| `strictNullChecks` | `false` | `true` |
| `strictBindCallApply` | `false` | `true` |
| `forceConsistentCasingInFileNames` | `false` | `true` |
| `noFallthroughCasesInSwitch` | `false` | `true` |
| `target` | `es2017` | `es2022` |

Recommendation: Use `"strict": true` instead of cherry-picking individual options.

### 4.7 Database

- **No `@@index` directives** in Prisma schema for commonly queried fields
- **No seed data mechanism** (no `prisma/seed.ts`)
- **25 migrations without squashing** — slow fresh database setup
- **Migration naming typos**: `prefernce`, `chnage`, `refernce`

---

## 5. Priority Summary

### Critical (Fix Immediately)

| # | Issue | Location |
|---|-------|----------|
| 1 | Hardcoded Gmail credentials | `api/src/app.module.ts:28-34` |
| 2 | Hardcoded NextAuth secret | `frontend/src/pages/api/auth/[...nextauth].ts:7` |
| 3 | `.env` files committed to git | `.env`, `api/.env` |
| 4 | JWT tokens never expire | `api/src/auth/jwt.strategy.ts:12` |
| 5 | SSL private key in Docker image | `reverseproxy/nginx.Dockerfile:4-6` |
| 6 | Password logged in plaintext | `api/src/users/users.queries.ts:60` |
| 7 | Wide-open CORS | `api/src/main.ts:15` |

### High (Fix Soon)

| # | Issue | Location |
|---|-------|----------|
| 8 | No auth guard on recipe creation | `api/src/recipes/recipes.controller.ts:55` |
| 9 | Registration bypasses ValidationPipe | `api/src/auth/auth.controller.ts:15-16` |
| 10 | All catch blocks throw generic "Error message" | All controllers |
| 11 | `findByLogin` swallows 401 error as 500 | `api/src/users/users.service.ts:54-74` |
| 12 | `remove` favorites calls wrong endpoint | `frontend/src/hooks/useFavorites.ts:33` |
| 13 | No React Error Boundaries | Frontend-wide |
| 14 | Middleware logic bug (setup check skipped) | `frontend/src/middleware.ts:22-29` |
| 15 | Missing nginx security headers | `reverseproxy/nginx.conf` |
| 16 | Weak SSL configuration | `reverseproxy/nginx.conf` |
| 17 | Node 18 EOL in all Dockerfiles | All Dockerfiles |
| 18 | Next.js 13 unmaintained | `frontend/package.json` |
| 19 | NestJS v9 unmaintained | `api/package.json` |
| 20 | DTOs missing all validation decorators | Multiple DTO files |
| 21 | `strictNullChecks: false` | `api/tsconfig.json:16` |
| 22 | No database indexes | `api/prisma/schema.prisma` |
| 23 | N+1 queries in `setPreferences` | `api/src/preferences/preferences.service.ts:11-16` |
| 24 | Full table scans without pagination | `recipe.queries.ts`, `ingredients.queries.ts`, `weekplan.queries.ts` |

### Medium (Next Sprint)

| # | Issue | Location |
|---|-------|----------|
| 25 | URL parameter injection (missing encodeURIComponent) | Frontend search components |
| 26 | Debounce creating new instances per keystroke | `Dislikes.tsx`, `PreferencesSettings.tsx` |
| 27 | Broken keyboard navigation (`hideDetailView` not called) | `DetailView.tsx:41` |
| 28 | NumberInput CSS bug (broken ternary) | `NumberInput.tsx:72` |
| 29 | No lazy loading for heavy components | Frontend-wide |
| 30 | Image optimization disabled | `frontend/next.config.js:13` |
| 31 | Unthrottled scroll listener | `MainHeader.tsx:21-29` |
| 32 | No nginx compression | `reverseproxy/nginx.conf` |
| 33 | No Docker layer caching in CI | `.gitlab-ci.yml` |
| 34 | Zero-downtime deployment missing | `.gitlab-ci.yml:161-163` |
| 35 | Deprecated packages (aws-sdk v2, crypto, @next/font) | `api/package.json`, `frontend/package.json` |
| 36 | Elasticsearch healthcheck uses `green` | `compose.yml:120` |
| 37 | Duplicate type definitions and data arrays | Frontend components |
| 38 | `@ts-ignore` instead of proper typing | `IngredientSearch.tsx`, `Keyfacts.tsx` |
| 39 | Missing ARIA labels and wrong alt texts | Multiple frontend components |
| 40 | Inconsistent styling (Tailwind + SCSS + inline) | Frontend-wide |
| 41 | Empty catch blocks | Backend and frontend |
| 42 | Fire-and-forget API calls without error handling | `settings/page.tsx`, `useFavorites.ts` |
| 43 | No test coverage for users, queries, health modules | API tests |
| 44 | Placeholder tests (`expect(true).toBeTruthy()`) | `auth.controller.spec.ts`, `cronjobs.service.ts` |
| 45 | Frontend not using Next.js standalone output | `frontend/Dockerfile` |

### Low (Backlog)

| # | Issue | Location |
|---|-------|----------|
| 46 | Inconsistent file naming (camelCase vs kebab-case) | `createPreferences.dto.ts` |
| 47 | Prettier config inconsistency between API and frontend | `.prettierrc` files |
| 48 | Duplicate ESLint rules | `frontend/.eslintrc.json` |
| 49 | Migration naming typos | `api/prisma/migrations/` |
| 50 | Orphaned `pgadmin-data` volume | `compose.yml` |
| 51 | Typos in code comments ("Orchistration", "Defenietly") | `weekplan.service.ts`, `recipe.interface.ts` |
| 52 | User-facing typo "Vegatarian" | `Keyfacts.tsx:14` |
| 53 | Dead/commented-out code | Multiple files |
| 54 | Deprecated `version` field in compose files | `compose.yml` |
| 55 | Missing `console.log` cleanup | Multiple files |
