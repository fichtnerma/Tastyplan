import { ClassSerializerInterceptor, Controller, Get, Post, Headers, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HeadersWithUser } from 'src/types/types';
import { WeekplanService } from './weekplan.service';

@Controller('weekplan')
export class WeekplanController {
    constructor(private weekplanService: WeekplanService) {}

    // @UseGuards(JwtAuthGuard)
    // @ApiSecurity('access-key')
    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('/current')
    findOne(@Headers() headers: HeadersWithUser) {
        console.log('get weekplan');

        const user = { userId: headers.user } as User;
        console.log(user);

        return this.weekplanService.get(user);
    }

    // @UseGuards(JwtAuthGuard)
    // @ApiSecurity('access-key')
    // @UseInterceptors(ClassSerializerInterceptor)
    @Post('/create')
    create(@Headers() headers: HeadersWithUser) {
        console.log('create weekplan');

        const user = { userId: headers.user } as User;
        return this.weekplanService.create(user);
    }
}
