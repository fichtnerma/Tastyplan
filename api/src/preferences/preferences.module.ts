import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { Module } from '@nestjs/common';

@Module({
    providers: [PreferencesService],
    controllers: [PreferencesController],
    exports: [PreferencesService],
})
export class PreferencesModule {}
