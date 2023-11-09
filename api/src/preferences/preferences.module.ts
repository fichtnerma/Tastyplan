import { PreferencesService } from './preferences.service';
import { PreferencesQueries } from './preferences.queries';
import { PreferencesController } from './preferences.controller';
import { Module } from '@nestjs/common';

@Module({
    providers: [PreferencesService, PreferencesQueries],
    controllers: [PreferencesController],
    exports: [PreferencesService, PreferencesQueries],
})
export class PreferencesModule {}
