import { WeekplanModule } from './weekplan/weekplan.module';
import { UsersModule } from './users/users.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SearchModule } from './search/search.module';
import { RecipesModule } from './recipes/recipes.module';
import { PrismaModule } from './prisma/prisma.module';
import { PreferencesModule } from './preferences/preferences.module';
import { PreferencesController } from './preferences/preferences.controller';
import { InitializerModule } from './initializer/initializer.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { FavoritesModule } from './favorites/favorites.module';
import { CronjobsModule } from './cronjobs/cronjobs/cronjobs.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import * as redisStore from 'cache-manager-redis-store';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({ isGlobal: true }),
        ServeStaticModule.forRoot({
            rootPath: process.env.NODE_ENV === 'development' ? '/app/images' : `${process.cwd()}/dist/images`,
            serveRoot: '/images',
        }),
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        }),
        CronjobsModule,
        IngredientsModule,
        RecipesModule,
        PreferencesModule,
        PrismaModule,
        WeekplanModule,
        UsersModule,
        AuthModule,
        SearchModule,
        ShoppingListModule,
        InitializerModule,
        FavoritesModule,
    ],
    controllers: [AppController, PreferencesController],
    providers: [AppService],
})
export class AppModule {}
