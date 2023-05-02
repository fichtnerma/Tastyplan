import { HeadersWithUser } from 'src/types/types';
import { WeekplanService } from './weekplan.service';
import { RequestWithUser } from 'src/users/users.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { ApiSecurity } from '@nestjs/swagger';
import {
    Controller,
    Get,
    Post,
    Headers,
    ClassSerializerInterceptor,
    UseGuards,
    UseInterceptors,
    Req,
} from '@nestjs/common';

@Controller('weekplan')
export class WeekplanController {
    constructor(private weekplanService: WeekplanService) {}

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/current')
    findOne(@Req() request: RequestWithUser) {
        console.log(request.user);

        const user = { userId: request.user.UserId } as User;

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
