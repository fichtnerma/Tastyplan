import { Body, Controller, Post } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferencesDto } from './dto/preferences.dto';

@Controller('preferences')
export class PreferencesController {
    constructor(private preferencesService: PreferencesService) { }

    @Post()
    preferences(@Body() dto: CreatePreferencesDto) {
         this.preferencesService.preferences(dto)
         return '';
    }
}
