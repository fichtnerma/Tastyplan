import { HeadersWithUser } from 'src/types/types';
import { PreferencesService } from './preferences.service';
import { PreferencesDto } from './dto/createPreferences.dto';
import { User } from '@prisma/client';
import { Body, Controller, Headers, Get, Post } from '@nestjs/common';

@Controller('preferences')
export class PreferencesController {
    constructor(private preferencesService: PreferencesService) {}

    // @UseGuards(JwtAuthGuard)
    // @ApiSecurity('access-key')
    // @UseInterceptors(ClassSerializerInterceptor)
    @Post('/')
    async setPreferences(@Headers() headers: HeadersWithUser, @Body() preferencesDto: PreferencesDto) {
        const user = { userId: headers.user } as User;

        return await this.preferencesService.setPreferences(preferencesDto, user);
    }

    // @UseGuards(JwtAuthGuard)
    // @ApiSecurity('access-key')
    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('/')
    async getPreferences(@Headers() headers: HeadersWithUser) {
        const user = { userId: headers.user } as User;
        return await this.preferencesService.getPreferences(user);
    }
}
