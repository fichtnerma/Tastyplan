import { WeekplanService } from './weekplan.service';
import { WeekplanQueries } from './weekplan.queries';
import { WeekplanController } from './weekplan.controller';
import { RecipesModule } from 'src/recipes/recipes.module';
import { PreferencesModule } from 'src/preferences/preferences.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [RecipesModule, PreferencesModule, RecipesModule],
    controllers: [WeekplanController],
    providers: [WeekplanService, WeekplanQueries],
    exports: [WeekplanService],
})
export class WeekplanModule {}
