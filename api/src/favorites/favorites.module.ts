import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [FavoritesController],
    providers: [FavoritesService],
})
export class FavoritesModule {}
