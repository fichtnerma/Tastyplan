import { WeekplanService } from './weekplan.service';
import { WeekplanController } from './weekplan.controller';
import { RecipesModule } from 'src/recipes/recipes.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [RecipesModule],
    controllers: [WeekplanController],
    providers: [WeekplanService],
})
export class WeekplanModule {}
