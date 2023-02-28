import { Controller,Get } from '@nestjs/common';
import { WeekplanService } from './weekplan.service';

@Controller('weekplan')
export class WeekplanController {

    constructor(private weekplanService: WeekplanService){}

    @Get()
    getWeekPlan() {
        return this.weekplanService.getWeekPlan() 
    }
}
