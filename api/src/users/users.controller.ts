import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Get } from '@nestjs/common/decorators';
import { ClassSerializerInterceptor, Controller, Request, UseGuards, UseInterceptors } from '@nestjs/common';

export type RequestWithUser = Request & { user: { id: string }; cookies: { [key: string]: string } };

@ApiTags('user')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('test')
    public test(@Request() request: RequestWithUser) {
        return { msg: 'Authentication worked', data: request.cookies, user: request.user };
    }
}
