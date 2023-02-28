import { Injectable } from '@nestjs/common';
import { PreferencesDto } from './dto/preferences.dto';


@Injectable()
export class PreferencesService {

    preferences(dto: PreferencesDto) {
        console.log(dto);
    }
}
