import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { SearchModule } from 'src/search/search.module';
import IngredientsSearchService from './ingredientsSearch.service';

@Module({
    imports: [SearchModule],
    providers: [IngredientsService, IngredientsSearchService],
    exports: [IngredientsService],
    controllers: [IngredientsController],
})
export class IngredientsModule {}
