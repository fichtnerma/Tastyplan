import { Module } from '@nestjs/common';
import { RecipesModule } from 'src/recipes/recipes.module';
import { WeekplanController } from './weekplan.controller';
import { WeekplanService } from './weekplan.service';

@Module({
    imports: [RecipesModule],
    controllers: [WeekplanController],
    providers: [WeekplanService],
})
export class WeekplanModule {}
