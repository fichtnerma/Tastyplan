import { WeekplanService } from './weekplan.service';
import { CreateWeekPlanDto } from './dto/create-weekPlan.dto';
import { RequestWithUser } from 'src/users/users.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { ApiSecurity } from '@nestjs/swagger';
import {
    Controller,
    Get,
    Post,
    ClassSerializerInterceptor,
    UseGuards,
    UseInterceptors,
    Req,
    Body,
} from '@nestjs/common';

@Controller('weekplan')
export class WeekplanController {
    constructor(private weekplanService: WeekplanService) {}

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/current')
    findOne(@Req() request: RequestWithUser) {
        const user = request.user as User;
        return this.weekplanService.get(user);
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:startDate')
    findByDate(@Req() request: RequestWithUser) {
        const user = request.user as User;
        const { startDate } = request.params as { startDate: string };
        return this.weekplanService.findByDate(user, new Date(startDate));
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/create')
    create(@Req() request: RequestWithUser, @Body() createWeekplanDto: CreateWeekPlanDto) {
        const { startDate, duration } = createWeekplanDto;
        const user = request.user as User;
        return this.weekplanService.create(user, new Date(startDate), duration);
    }
}
