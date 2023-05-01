import { HeadersWithUser } from 'src/types/types';
import { WeekplanService } from './weekplan.service';
import { User } from '@prisma/client';
import { Controller, Get, Post, Headers } from '@nestjs/common';

@Controller('weekplan')
export class WeekplanController {
    constructor(private weekplanService: WeekplanService) {}

    // @UseGuards(JwtAuthGuard)
    // @ApiSecurity('access-key')
    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('/current')
    findOne(@Headers() headers: HeadersWithUser) {
        const user = { userId: headers.user } as User;

        return this.weekplanService.get(user);
    }

    // @UseGuards(JwtAuthGuard)
    // @ApiSecurity('access-key')
    // @UseInterceptors(ClassSerializerInterceptor)
    @Post('/create')
    create(@Headers() headers: HeadersWithUser) {
        const user = { userId: headers.user } as User;
        return this.weekplanService.create(user);
    }
}
