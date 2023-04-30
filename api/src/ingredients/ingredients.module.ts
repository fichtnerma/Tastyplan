import IngredientsSearchService from './ingredientsSearch.service';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { SearchModule } from 'src/search/search.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [SearchModule],
    providers: [IngredientsService, IngredientsSearchService],
    exports: [IngredientsService],
    controllers: [IngredientsController],
})
export class IngredientsModule {}
