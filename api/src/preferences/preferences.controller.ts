import {
    Body,
    ClassSerializerInterceptor,
    Controller,
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
    constructor(private preferencesService: PreferencesService) { }

    // @UseGuards(JwtAuthGuard)
    // @ApiSecurity('access-key')
    // @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async preferences(@Body() preferencesDto: PreferencesDto) {
        console.log(preferencesDto);
        // const user = req.user;
        return await this.preferencesService.setPreferences(preferencesDto);

    }
}
