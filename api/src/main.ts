/* eslint-disable import-helpers/order-imports */
import { AppModule } from './app.module';
import Module from 'module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';

declare const module: Module & { hot?: { accept: () => void; dispose: (callback: () => void) => void } };

const cookieParser = require('cookie-parser');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.use(json({ limit: '10mb' }));

    const config = new DocumentBuilder()
        .setTitle('TastyPlan')
        .setDescription('The tastyPlan API description')
        .setVersion('1.0')
        .addTag('tastyPlan')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.use(cookieParser());
    app.use(json({ limit: '10mb' }));
    await app.listen(3000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
