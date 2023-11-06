import { CronjobsService } from './cronjobs.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [CronjobsService],
})
export class CronjobsModule {}
