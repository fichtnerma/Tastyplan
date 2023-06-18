import { WeekplanModule } from './weekplan/weekplan.module';
import { UsersModule } from './users/users.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SearchModule } from './search/search.module';
import { RecipesModule } from './recipes/recipes.module';
import { PrismaModule } from './prisma/prisma.module';
import { PreferencesModule } from './preferences/preferences.module';
import { PreferencesController } from './preferences/preferences.controller';
import { IngredientsModule } from './ingredients/ingredients.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        IngredientsModule,
        RecipesModule,
        PreferencesModule,
        PrismaModule,
        WeekplanModule,
        UsersModule,
        AuthModule,
        SearchModule,
        ServeStaticModule.forRoot({
            rootPath: process.env.NODE_ENV === 'development' ? '/app/images' : `${process.cwd()}/dist/images`,
            serveRoot: '/images',
        }),
        ShoppingListModule,
        FavoritesModule,
    ],
    controllers: [AppController, PreferencesController],
    providers: [AppService],
})
export class AppModule {}
