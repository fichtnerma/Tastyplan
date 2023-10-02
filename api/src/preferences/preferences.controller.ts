import { PreferencesService } from './preferences.service';
import { PreferencesDto } from './dto/createPreferences.dto';
import { RequestWithUser } from 'src/users/users.controller';
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
} from '@nestjs/common';

@Controller('preferences')
export class PreferencesController {
    constructor(private preferencesService: PreferencesService) {}
    /* @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor) */
    @Post('/')
    async setPreferences(@Req() request: RequestWithUser, @Body() preferencesDto: PreferencesDto) {
        const user = { userId: 'lars' };
        console.log('USER', user);
        console.log('PREFERENCES', preferencesDto);
        return await this.preferencesService.setPreferences(preferencesDto, user);
    }

    /* @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor) */
    @Get('/')
    async getPreferences(@Req() request: RequestWithUser) {
        //const user = request.user as User;
        const user = { userId: 'lars' };
     //   return await this.preferencesService.getPreferences(user);
    }
}
