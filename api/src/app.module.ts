import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientsModule } from './ingredients/ingredients.module';
import { RecipesModule } from './recipes/recipes.module';
import { PreferencesController } from './preferences/preferences.controller';
import { PreferencesModule } from './preferences/preferences.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WeekplanModule } from './weekplan/weekplan.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), 
        IngredientsModule, 
        RecipesModule, 
        PreferencesModule, 
        PrismaModule, 
        WeekplanModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'images'),
            serveRoot: '/images',
          }),],
    controllers: [AppController, PreferencesController],
    providers: [AppService],
})
export class AppModule {}
