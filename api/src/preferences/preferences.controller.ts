import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { PreferencesDto } from './dto/createPreferences.dto';
import { ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';

@Controller('preferences')
export class PreferencesController {
    constructor(private preferencesService: PreferencesService) {}

    // @UseGuards(JwtAuthGuard)
    // @ApiSecurity('access-key')
    // @UseInterceptors(ClassSerializerInterceptor)
    @Post('/')
    async setPreferences(@Request() req: any, @Body() preferencesDto: PreferencesDto) {
        console.log('preferencesDto');

        console.log(preferencesDto);
        const user = { userId: req.headers.user } as User;
        console.log(user);

        return await this.preferencesService.setPreferences(preferencesDto, user);
    }

    // @UseGuards(JwtAuthGuard)
    // @ApiSecurity('access-key')
    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('/')
    async getPreferences(@Request() req: any) {
        const user = { userId: req.headers.user } as User;
        return await this.preferencesService.getPreferences(user);
    }
}
