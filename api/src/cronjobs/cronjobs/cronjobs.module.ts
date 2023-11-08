import { CronjobsService } from './cronjobs.service';
import { CronjobsQueries } from './cronjobs.queries';
import { WeekplanModule } from 'src/weekplan/weekplan.module';
import { Module } from '@nestjs/common';

@Module({
    providers: [CronjobsService, CronjobsQueries],
    imports: [WeekplanModule],
})
export class CronjobsModule {}
