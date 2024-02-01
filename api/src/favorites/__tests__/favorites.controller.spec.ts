import { FavoritesService } from '../favorites.service';
import { FavoritesQueries } from '../favorites.queries';
import { FavoritesController } from '../favorites.controller';
import { AddFavoriteDto } from '../dto/add-favorite.dto';
import { RequestWithUser } from 'src/users/users.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('FavoritesController', () => {
    let service: FavoritesService;
    let controller: FavoritesController;

    const mockRequestWithUser = {
        user: {
            id: '1',
            userId: '1',
        },
        cookies: {},
    } as RequestWithUser;

    beforeEach(async () => {
        const mockFavoritesQueries = jest.fn(() => ({
            // mock methods here if needed
        }));

        const module: TestingModule = await Test.createTestingModule({
            controllers: [FavoritesController],
            providers: [FavoritesService, { provide: FavoritesQueries, useValue: mockFavoritesQueries() }],
        }).compile();
        controller = module.get<FavoritesController>(FavoritesController);
        service = module.get<FavoritesService>(FavoritesService);
    });

    it('POST: add => Should return an success message', async () => {
        const addFavoriteDtoExample: AddFavoriteDto = {
            recipeId: '32',
        };
        const mockExpectedResponse = 'New favorite added';

        jest.spyOn(service, 'addOrDelete').mockResolvedValue(mockExpectedResponse);

        const result = await controller.addOrDelete(addFavoriteDtoExample, mockRequestWithUser);

        expect(service.addOrDelete).toHaveBeenCalled();
        expect(result).toEqual(mockExpectedResponse);
    });

    it('POST: add => Should return HTTP exception in service error case', async () => {
        const addFavoriteDtoExample: AddFavoriteDto = {
            recipeId: '32',
        };

        jest.spyOn(service, 'addOrDelete').mockImplementation(() => {
            throw new Error();
        });

        try {
            await controller.addOrDelete(addFavoriteDtoExample, mockRequestWithUser);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });

    it('GET: / => Should return a list of recipes', async () => {
        const mockExpectedRecipes = [
            {
                name: 'Recipe 1',
                cookingTime: 30,
                description: 'This is recipe 1',
                formOfDiet: 'Vegan',
                id: 1,
                img: 'url_to_image_1',
                preparingTime: 15,
                servings: 4,
                tags: ['tag1', 'tag2'],
                totalTime: 45,
            },
            {
                name: 'Recipe 2',
                cookingTime: 40,
                description: 'This is recipe 2',
                formOfDiet: 'Vegetarian',
                id: 2,
                img: 'url_to_image_2',
                preparingTime: 20,
                servings: 2,
                tags: ['tag3', 'tag4'],
                totalTime: 60,
            },
            {
                name: 'Recipe 3',
                cookingTime: 50,
                description: 'This is recipe 3',
                formOfDiet: 'Pescatarian',
                id: 3,
                img: 'url_to_image_3',
                preparingTime: 25,
                servings: 6,
                tags: ['tag5', 'tag6'],
                totalTime: 75,
            },
        ];
        jest.spyOn(service, 'findAllFavorites').mockResolvedValue(mockExpectedRecipes);

        const result = await controller.findAll(mockRequestWithUser);

        expect(service.findAllFavorites).toHaveBeenCalled();
        expect(result).toEqual(mockExpectedRecipes);
    });

    it('GET: / => Should return HTTP exception in service error case', async () => {
        jest.spyOn(service, 'findAllFavorites').mockImplementation(() => {
            throw new Error();
        });
        try {
            await controller.findAll(mockRequestWithUser);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
});
