import { UserState } from 'src/types/types';
import { promisify } from 'util';
import { Role } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { exec } from 'child_process';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { ElasticsearchContainer } from '@testcontainers/elasticsearch';
import { Ingredient, Preferences, User } from '@prisma/client';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { ClientOptions } from '@elastic/elasticsearch';
const fs = require('fs');

const execAsync = promisify(exec);

const dbConfig = {
    POSTGRES_DB: 'test',
    POSTGRES_PORT: 5432,
    POSTGRES_USER: 'username',
    POSTGRES_PASSWORD: 'password',
    POSTGRES_HOST: 'localhost',
};

async function setupPGTestContainer() {
    const container = await new PostgreSqlContainer()
        .withDatabase(dbConfig.POSTGRES_DB)
        .withUsername(dbConfig.POSTGRES_USER)
        .withPassword(dbConfig.POSTGRES_PASSWORD)
        .withExposedPorts(dbConfig.POSTGRES_PORT)
        .withCopyFilesToContainer([
            {
                source: 'dump.sql',
                target: '/tmp/dump.sql',
            },
        ])
        .start();

    return container;
}

export async function setupPrismaService(withDump = false) {
    const container = await setupPGTestContainer();
    const databaseUrl = container.getConnectionUri();
    const result = await execAsync(
        `set DATABASE_URL=${databaseUrl} && set POSTGRES_DB=${dbConfig.POSTGRES_HOST} && npx prisma migrate deploy`,
    );
    const configService = new ConfigService();
    configService.get = jest.fn().mockReturnValue(databaseUrl);
    const prisma = new PrismaService(configService);
    return prisma;
}

export async function setupElasticSearchService() {
    const ELASTIC_PASSWORD = 'admin';
    const ELASTIC_USERNAME = 'elastic';
    const container = await new ElasticsearchContainer('elasticsearch:7.17.13')
        .withEnvironment({ ELASTIC_PASSWORD, ELASTIC_USERNAME })
        .withExposedPorts(9200)
        .start();

    container.getHttpUrl();
    const configOptions: ClientOptions = {
        node: `${container.getHttpUrl()}`,
        auth: {
            username: ELASTIC_USERNAME,
            password: ELASTIC_PASSWORD,
        },
    };
    const elastic = new ElasticsearchService(configOptions);
    return elastic;
}

type SeedingOptions = {
    withWeekplan?: boolean;
    withUsers?: boolean;
    withPreferences?: boolean;
    withIngredients?: boolean;
    withRecipes?: boolean;
};

export async function seedDatabase(prismaService: PrismaService, options: SeedingOptions = {}) {
    if (options.withWeekplan) {
        const users = await seedWithUsers(prismaService);
        const preferences = await seedWithPreferences(prismaService, users.userFinished);
        const ingredients = await seedWithIngredients(prismaService);
        await seedWithRecipes(prismaService, ingredients);
        await seedWithWeekplan(prismaService, preferences);
    } else if (options.withUsers) {
        await seedWithUsers(prismaService);
    } else if (options.withPreferences) {
        const users = await seedWithUsers(prismaService);
        const preferences = await seedWithPreferences(prismaService, users.userFinished);
    } else if (options.withIngredients) {
        await seedWithIngredients(prismaService);
    } else if (options.withRecipes) {
        const ingredients = await seedWithIngredients(prismaService);
        await seedWithRecipes(prismaService, ingredients);
    }
}

async function seedWithRecipes(prismaService: PrismaService, ingredients: Ingredient[] = []) {
    await prismaService.recipe.create({
        data: {
            name: 'recipe1',
            description: 'description',
            cookingTime: 10,
            preparingTime: 10,
            totalTime: 20,
            servings: 1,
            img: 'img',
            formOfDiet: 'omnivore',
            ingredients: {
                createMany: {
                    data: ingredients.map((ingredient) => ({
                        ingredientId: ingredient.id,
                    })),
                },
            },
            steps: {
                createMany: {
                    data: [
                        {
                            stepCount: 1,
                            description: 'description1',
                        },
                    ],
                },
            },
        },
    });
}

async function seedWithUsers(prismaService: PrismaService) {
    const userFinished = await prismaService.user.create({
        data: {
            userId: 'userid1',
            password: 'password',
            role: Role.USER,
            state: UserState.finished,
        },
    });
    const userRegistration = await prismaService.user.create({
        data: { userId: 'userid2', password: 'password', role: Role.USER, state: UserState.registration },
    });
    return { userFinished, userRegistration };
}

async function seedWithPreferences(prismaService: PrismaService, user: User) {
    return await prismaService.preferences.create({
        data: {
            userId: user.userId,
            formOfDiet: 'omnivore',
            allergens: ['sesame'],
            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            wantsLunch: true,
            wantsDinner: true,
            servings: 1,
        },
    });
}

async function seedWithIngredients(prismaService: PrismaService) {
    await prismaService.ingredient.createMany({
        data: [
            {
                name: 'ingredient1',
                categories: 'categories',
                subcategories: 'subcategories',
                calories: 340.4,
                protein: 12.3,
                fat: 0.4,
                carbs: 9.3,
                calcium: 0.1,
                iron: null,
                magnesium: null,
                allergens: [],
            },
            {
                name: 'ingredient2',
                categories: 'categories',
                subcategories: 'subcategories',
                calories: 340.4,
                protein: 12.3,
                fat: 0.4,
                carbs: 9.3,
                calcium: 0.1,
                iron: null,
                magnesium: null,
                allergens: [],
            },
        ],
    });
    return await prismaService.ingredient.findMany();
}

async function seedWithWeekplan(prismaService: PrismaService, preferences: Preferences) {
    const recipes = await prismaService.recipe.findMany();
    await prismaService.weekplan.create({
        data: {
            userId: preferences.userId,
            startDate: new Date(),
            endDate: new Date(new Date().getDate() + 7),
            hasLunch: preferences.wantsLunch,
            hasDinner: preferences.wantsDinner,
            weekplanEntry: {
                createMany: {
                    data: recipes.map((recipe, index) => ({
                        date: new Date(new Date().getDate() + index),
                        lunchId: recipe.id,
                        dinnerId: recipe.id,
                    })),
                },
            },
        },
    });
}
