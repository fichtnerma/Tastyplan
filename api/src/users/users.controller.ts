import { UsersService } from './users.service';
import { UpdatePasswordDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Body, ClassSerializerInterceptor, Controller, Put, Request, UseGuards, UseInterceptors } from '@nestjs/common';

export type RequestWithUser = Request & { user: { id: string } } & { params: unknown };

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
}
