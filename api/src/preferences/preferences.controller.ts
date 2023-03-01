import { Body, Controller, Post } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferencesDto } from './dto/createPreferences.dto';

@Controller('preferences')
export class PreferencesController {
    constructor(private preferencesService: PreferencesService) { }


    @Post()
    preferences(@Body() dtoCreatePreferencesDto: CreatePreferencesDto) { 
        return this.preferencesService.preferences(dtoCreatePreferencesDto)
    }
}
