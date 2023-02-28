import { Module } from '@nestjs/common';
import { StepsService } from './steps.service';
import { StepsController } from './steps.controller';

@Module({
    imports: [],
    controllers: [StepsController],
    providers: [StepsService],
    exports: [StepsService],
})
export class StepsModule {}
