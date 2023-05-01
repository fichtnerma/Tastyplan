import { UsersService } from './users.service';
import { UpdatePasswordDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Get } from '@nestjs/common/decorators';
import { Body, ClassSerializerInterceptor, Controller, Put, Request, UseGuards, UseInterceptors } from '@nestjs/common';

type RequestWithUser = Request & { user: { id: string }; cookies: { [key: string]: string } };

@ApiTags('user')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Put('update/password')
    public async updatePassword(
        @Request() req: RequestWithUser,
        @Body()
        updatePasswordDto: UpdatePasswordDto,
    ) {
        await this.usersService.updatePassword(updatePasswordDto, req.user.id);
        return {
            message: 'password_update_success',
        };
    }
    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('test')
    public test(@Request() request: RequestWithUser) {
        return { msg: 'Authentication worked', data: request.cookies, user: request.user };
    }
}
