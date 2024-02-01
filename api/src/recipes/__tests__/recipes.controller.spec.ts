import { RecipesService } from '../recipes.service';
import { RecipesController } from '../recipes.controller';
import { RecipesUploadImageService } from 'src/recipes/recipesUploadImage.service';
import { RecipesSearchService } from 'src/recipes/recipesSearch.service';
import { RecipesFilterService } from 'src/recipes/recipesFilter.service';
import { RecipeQueries } from 'src/recipes/recipe.queries';
import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/common';

jest.mock('sharp', () =>
    jest.fn(() => ({
        // mock methods here if needed
    })),
);

describe('UsersController', () => {
    let service: RecipesService;
    let controller: RecipesController;

    // Create mock implementations of the dependencies
    const mockRecipesFilterService = jest.fn(() => ({
        // mock methods here if needed
    }));

    const mockRecipeSearchService = jest.fn(() => ({
        // mock methods here if needed
    }));

    const mockRecipeQueries = jest.fn(() => ({
        // mock methods here if needed
    }));
    const mockRecipesUploadImageService = jest.fn(() => ({
        // mock methods here if needed
    }));

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RecipesService,
                { provide: RecipesFilterService, useValue: mockRecipesFilterService() },
                { provide: RecipesSearchService, useValue: mockRecipeSearchService() },
                { provide: RecipeQueries, useValue: mockRecipeQueries() },
                { provide: RecipesUploadImageService, useValue: mockRecipesUploadImageService() },
                { provide: CACHE_MANAGER, useValue: {} },
            ],
        }).compile();
        service = module.get<RecipesService>(RecipesService);
    });

    it('GET: recommend/:id => Should ', () => {
        expect(true).toBeTruthy();
    });
});
