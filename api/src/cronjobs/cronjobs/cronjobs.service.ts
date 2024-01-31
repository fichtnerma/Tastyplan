import { CronjobsQueries } from './cronjobs.queries';
import { WeekplanService } from 'src/weekplan/weekplan.service';
import { Cron } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CronjobsService {
    constructor(private weekplanService: WeekplanService, private cronjobsQueries: CronjobsQueries) {}

    @Cron('0 23 * * *')
    async handleCron() {
        console.log('##########Cronjob Create Weekplan START##########');
        const allUsers = await this.cronjobsQueries.findManyUserIds();
        for (const user of allUsers) {
            const currentWeekplan = await this.weekplanService.current(user.userId);
            const expiringDate = this.createExpiringDate();
            expiringDate.setDate(expiringDate.getDate() + 2);
            expiringDate.setHours(0, 0, 0, 0);
            if (currentWeekplan.endDate <= expiringDate) {
                try {
                    await this.weekplanService.create(user.userId);
                    console.log('New Weekplan for user: ' + user.userId + ' created');
                } catch (error) {
                    console.log('Error creating new Weekplan for user: ' + user.userId + ' ' + error);
                }
            }
        }
        console.log('##########Cronjob Create Weekplan END##########');
    }

    createExpiringDate() {
        const expiringDate = new Date();
        expiringDate.setDate(expiringDate.getDate() + 2);
        expiringDate.setHours(0, 0, 0, 0);
        return expiringDate;
    }
}
