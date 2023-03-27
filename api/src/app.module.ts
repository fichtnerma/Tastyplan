import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientsModule } from './ingredients/ingredients.module';
import { RecipesModule } from './recipes/recipes.module';
import { PreferencesController } from './preferences/preferences.controller';
import { PreferencesModule } from './preferences/preferences.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { WeekplanModule } from './weekplan/weekplan.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';

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
    ],
    controllers: [AppController, PreferencesController],
    providers: [AppService],
})
export class AppModule {}
