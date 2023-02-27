import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST') || 'localhost',
                port: configService.get('POSTGRES_PORT') || 6543,
                username: configService.get('POSTGRES_USER') || 'username',
                password: configService.get('POSTGRES_PASSWORD') || 'password',
                database: configService.get('POSTGRES_DB') || 'docker-postgres',
                entities: [__dirname + '/../**/*.entity.{js,ts}'],
                synchronize: true,
            }),
        }),
    ],
})
export class DatabaseModule {}
