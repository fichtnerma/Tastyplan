import { Body, Controller, Post } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferencesDto } from './dto/createPreferences.dto';

@Controller('preferences')
export class PreferencesController {
    constructor(private preferencesService: PreferencesService) { }

    @Post()
    preferences(@Body() dto: CreatePreferencesDto) {
        return this.preferencesService.preferences(dto)
    }
}
