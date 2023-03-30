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

@Controller('preferences')
export class PreferencesController {
    constructor(private preferencesService: PreferencesService) {}

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/')
    async setPreferences(@Request() req: any, @Body() preferencesDto: PreferencesDto) {
        console.log(preferencesDto);
        const user = req.user;
        return await this.preferencesService.setPreferences(preferencesDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/')
    async getPreferences(@Request() req: any) {
        const user = req.user;
        return await this.preferencesService.getPreferences(user);
    }
}
