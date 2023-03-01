import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientsModule } from './ingredients/ingredients.module';
import { RecipesModule } from './recipes/recipes.module';
import { StepsModule } from './steps/steps.module';
import { PreferencesController } from './preferences/preferences.controller';
import { PreferencesModule } from './preferences/preferences.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { WeekplanModule } from './weekplan/weekplan.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), IngredientsModule, RecipesModule, StepsModule, PreferencesModule, PrismaModule, WeekplanModule],
    controllers: [AppController, PreferencesController],
    providers: [AppService],
})
export class AppModule {}
