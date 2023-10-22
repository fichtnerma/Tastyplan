import { WeekplanService } from './weekplan.service';
import { WeekplanController } from './weekplan.controller';
import { ShoppingListModule } from 'src/shopping-list/shopping-list.module';
import { RecipesModule } from 'src/recipes/recipes.module';
import { PreferencesModule } from 'src/preferences/preferences.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [RecipesModule, ShoppingListModule, PreferencesModule],
    controllers: [WeekplanController],
    providers: [WeekplanService],
})
export class WeekplanModule {}
