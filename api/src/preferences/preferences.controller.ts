import { Body, Controller, Post } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { PreferencesDto } from './dto/createPreferences.dto';

@Controller('preferences')
export class PreferencesController {
    constructor(private preferencesService: PreferencesService) { }


    @Post()
    preferences(@Body() preferencesDto: PreferencesDto) { 
        return this.preferencesService.preferences(preferencesDto)
    }
}
