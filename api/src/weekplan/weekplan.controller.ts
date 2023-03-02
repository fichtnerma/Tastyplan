import { Controller, Get, Param } from '@nestjs/common';
import { WeekplanService } from './weekplan.service';

@Controller('weekplan')
export class WeekplanController {
    constructor(private weekplanService: WeekplanService) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.weekplanService.findById(1);
    }
}
