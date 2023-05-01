import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        ConfigModule,
        ElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                node: 'http://elasticsearch:9200',
                auth: {
                    username: configService.get('ELASTIC_USERNAME'),
                    password: configService.get('ELASTIC_PASSWORD'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [ElasticsearchModule],
})
export class SearchModule {}
