import { Body, ClassSerializerInterceptor, Controller, Put, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdatePasswordDto } from './dto/create-user.dto';
import { Get } from '@nestjs/common/decorators';
@ApiTags('user')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Put('update/password')
    public async updatePassword(
        @Request() req: any,
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
    public test() {
        return 'Authentication worked';
    }
}
