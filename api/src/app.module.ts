import { WeekplanModule } from './weekplan/weekplan.module';
import { UsersModule } from './users/users.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SearchModule } from './search/search.module';
import { RecipesModule } from './recipes/recipes.module';
import { PrismaModule } from './prisma/prisma.module';
import { PreferencesModule } from './preferences/preferences.module';
import { PreferencesController } from './preferences/preferences.controller';
import { MailModule } from './mail/mail/mail.module';
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
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.example.com',
                port: 465,
                secure: false,
                auth: {
                    user: 'hannes.eckelt@gmail.com',
                    pass: 'passwort123456!',
                },
            },
            defaults: {
                from: '"nest-modules" <modules@nestjs.com>',
            },
            template: {
                dir: process.cwd() + '/template/',
                adapter: new HandlebarsAdapter(), // or new PugAdapter()
                options: {
                    strict: true,
                },
            },
        }),
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
        MailModule,
    ],
    controllers: [AppController, PreferencesController],
    providers: [AppService],
})
export class AppModule {}
