import { RecipeHealthIndicator } from './recipe.health';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly recipeHealthIndicator: RecipeHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    checkHealth() {
        return this.health.check([() => this.recipeHealthIndicator.isHealthy()]);
    }
}
