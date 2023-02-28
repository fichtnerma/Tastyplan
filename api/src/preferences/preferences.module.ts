import { Module } from '@nestjs/common';
import { PreferencesController } from './preferences.controller';
import { PreferencesService } from './preferences.service';

@Module({
    providers: [PreferencesService],
    controllers: [PreferencesController],
    exports: [PreferencesService],
})
export class PreferencesModule {}
