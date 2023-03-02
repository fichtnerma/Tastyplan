import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';

@Module({
    imports: [],
    controllers: [IngredientsController],
    providers: [IngredientsService],
    exports: [IngredientsService],
})
export class IngredientsModule {}
