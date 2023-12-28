import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecipeHealthIndicator extends HealthIndicator {
    constructor(private readonly prismaService: PrismaService) {
        super();
    }
    async isHealthy(): Promise<HealthIndicatorResult> {
        return null;
        /* const latestRecipe = await this.prismaService.recipe.findFirst({
            orderBy: { updatedAt: 'desc' },
        });

        const isHealthy = latestRecipe !== null;
        const result = this.getStatus('latestRecipe', isHealthy, { latestRecipe });

        if (isHealthy) {
            return result;
        }
        throw new HealthCheckError('Recipe is not present', result);*/
    }
}
