import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientsModule } from './ingredients/ingredients.module';
import { RecipesModule } from './recipes/recipes.module';
import { StepsModule } from './steps/steps.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import * as Joi from '@hapi/joi';

@Module({
    // imports: [
    //     ConfigModule.forRoot({
    //         validationSchema: Joi.object({
    //             POSTGRES_HOST: Joi.string().required(),
    //             POSTGRES_PORT: Joi.number().required(),
    //             POSTGRES_USER: Joi.string().required(),
    //             POSTGRES_PASSWORD: Joi.string().required(),
    //             POSTGRES_DB: Joi.string().required(),
    //             API_PORT: Joi.number().required(),
    //         }),
    //     }),
    //     DatabaseModule,
    //     IngredientsModule,
    //     RecipesModule,
    //     StepsModule,
    //     DatabaseModule,
    //     UsersModule,
    // ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
