import { PreferencesService } from '../preferences.service';
import { PreferencesQueries } from '../preferences.queries';
import { PreferencesController } from '../preferences.controller';
import { PreferencesDto } from '../dto/createPreferences.dto';
import { RequestWithUser } from 'src/users/users.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('PreferencesController', () => {
    let service: PreferencesService;
    let controller: PreferencesController;

    const mockRequestWithUser = {
        user: {
            id: '1',
            userId: '1',
        },
        cookies: {},
    } as RequestWithUser;

    beforeEach(async () => {
        const mockPreferencesQueries = jest.fn(() => ({
            // mock methods here if needed
        }));

        const module: TestingModule = await Test.createTestingModule({
            controllers: [PreferencesController],
            providers: [PreferencesService, { provide: PreferencesQueries, useValue: mockPreferencesQueries() }],
        }).compile();
        controller = module.get<PreferencesController>(PreferencesController);
        service = module.get<PreferencesService>(PreferencesService);
    });
    it('POST: / => Should return a success message', async () => {
        const mockPreferencesDto: PreferencesDto = {
            formOfDiet: 'vegetarian',
            allergens: ['peanuts', 'shellfish'],
            foodDislikes: [
                { id: 1, name: 'Broccoli' },
                { id: 2, name: 'Mushrooms' },
            ],
            days: ['monday', 'wednesday', 'friday'],
            wantsLunch: true,
            wantsDinner: false,
            servings: 4,
        };
        const mockExpectedResult = 'Preferences has been send successfully';
        jest.spyOn(service, 'setPreferences').mockResolvedValue(mockExpectedResult);

        const result = await controller.setPreferences(mockRequestWithUser, mockPreferencesDto);

        expect(service.setPreferences).toHaveBeenCalled();
        expect(result).toEqual(mockExpectedResult);
    });

    it('POST: / => Should return HTTP exception in service error case', async () => {
        jest.spyOn(service, 'setPreferences').mockImplementation(() => {
            throw new Error();
        });
        const mockPreferencesDto: PreferencesDto = {
            formOfDiet: 'vegetarian',
            allergens: ['peanuts', 'shellfish'],
            foodDislikes: [
                { id: 1, name: 'Broccoli' },
                { id: 2, name: 'Mushrooms' },
            ],
            days: ['monday', 'wednesday', 'friday'],
            wantsLunch: true,
            wantsDinner: false,
            servings: 4,
        };

        try {
            await controller.setPreferences(mockRequestWithUser, mockPreferencesDto);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });

    it('GET: / => Should return a preference', async () => {
        const mockExpectedPreferences = {
            formOfDiet: 'vegetarian',
            allergens: ['peanuts', 'shellfish'],
            foodDislikes: [
                { id: 1, name: 'Broccoli' },
                { id: 2, name: 'Mushrooms' },
            ],
            days: ['monday', 'wednesday', 'friday'],
            wantsLunch: true,
            wantsDinner: false,
            servings: 4,
        };

        jest.spyOn(service, 'getPreferences').mockResolvedValue(mockExpectedPreferences);

        const result = await controller.getPreferences(mockRequestWithUser);

        expect(service.getPreferences).toHaveBeenCalled();
        expect(result).toEqual(mockExpectedPreferences);
    });

    it('GET: / => Should return HTTP exception in service error case', async () => {
        jest.spyOn(service, 'getPreferences').mockImplementation(() => {
            throw new Error();
        });

        try {
            await controller.getPreferences(mockRequestWithUser);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
});
