import { RecipeHealthIndicator } from './recipe.health';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { Module } from '@nestjs/common';

@Module({
    controllers: [HealthController],
    imports: [TerminusModule],
    providers: [RecipeHealthIndicator],
})
export class HealthModule {}
