import { RecipeHealthIndicator } from './recipe.health';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly recipeHealthIndicator: RecipeHealthIndicator,
        private readonly http: HttpHealthIndicator,
    ) {}

    /*@Get()
    @HealthCheck()
    checkHealth() {
        return this.health.check([() => this.recipeHealthIndicator.isHealthy()]);
    }*/

    @Get()
    @HealthCheck()
    checkHealth() {
        return this.health.check([() => this.http.pingCheck('recipes/200', 'http://localhost:3000')]);
    }
}
