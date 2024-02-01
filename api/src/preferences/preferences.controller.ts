import { PreferencesService } from './preferences.service';
import { PreferencesDto } from './dto/createPreferences.dto';
import { RequestWithUser } from 'src/users/users.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { ApiSecurity } from '@nestjs/swagger';
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    UseInterceptors,
    HttpException,
    HttpStatus,
} from '@nestjs/common';

@Controller('preferences')
export class PreferencesController {
    constructor(private preferencesService: PreferencesService) {}
    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/')
    async setPreferences(@Req() request: RequestWithUser, @Body() preferencesDto: PreferencesDto) {
        try {
            const user = request.user as User;
            return await this.preferencesService.setPreferences(preferencesDto, user.userId);
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/')
    async getPreferences(@Req() request: RequestWithUser) {
        try {
            const user = request.user as User;
            return await this.preferencesService.getPreferences(user.userId);
        } catch (error) {
            throw new HttpException('Error message', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
