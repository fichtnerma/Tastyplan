import { Cron } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CronjobsService {
    private readonly logger = new Logger(CronjobsService.name);

    @Cron('45 * * * * *')
    handleCron() {
        this.logger.debug('Called when the current second is 45');
        console.log('Cronjob called');
    }
}
