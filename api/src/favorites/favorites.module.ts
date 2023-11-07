import { FavoritesService } from './favorites.service';
import { FavoritesQueries } from './favorites.queries';
import { FavoritesController } from './favorites.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [FavoritesController],
    providers: [FavoritesService, FavoritesQueries],
})
export class FavoritesModule {}
