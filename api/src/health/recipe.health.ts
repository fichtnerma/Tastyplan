import { PrismaService } from '../prisma/prisma.service';
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';

type FindFirstArgs = {
    orderBy?: { id?: 'asc' | 'desc' };
};

@Injectable()
export class RecipeHealthIndicator extends HealthIndicator {
    constructor(private readonly prismaService: PrismaService) {
        super();
    }
    async isHealthy(): Promise<HealthIndicatorResult> {
        const latestRecipe = await this.prismaService.recipe.findFirst({
            orderBy: { id: 'desc' },
        } as FindFirstArgs);

        const isHealthy = latestRecipe !== null;
        const result = this.getStatus('latestRecipe', isHealthy, { latestRecipe });

        if (isHealthy) {
            return result;
        }
        throw new HealthCheckError('Recipe is not present', result);
    }
}
