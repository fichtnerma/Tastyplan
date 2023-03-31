import { ClassSerializerInterceptor, Controller, Get, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { WeekplanService } from './weekplan.service';

@Controller('weekplan')
export class WeekplanController {
    constructor(private weekplanService: WeekplanService) {}

    // @UseGuards(JwtAuthGuard)
    // @ApiSecurity('access-key')
    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('/current')
    findOne(@Request() req: any) {
        const user = { userId: req.headers.user } as User;
        console.log(user);

        return this.weekplanService.get(user);
    }

    // @UseGuards(JwtAuthGuard)
    // @ApiSecurity('access-key')
    // @UseInterceptors(ClassSerializerInterceptor)
    @Post('/create')
    create(@Request() req: any) {
        const user = { userId: req.headers.user } as User;
        return this.weekplanService.create(user);
    }
}
