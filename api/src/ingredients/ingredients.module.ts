import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';

@Module({
    imports: [],
    providers: [IngredientsService],
    exports: [IngredientsService],
})
export class IngredientsModule {}
