import { Module } from '@nestjs/common';
import { WeekplanController } from './weekplan.controller';
import { WeekplanService } from './weekplan.service';

@Module({
  controllers: [WeekplanController],
  providers: [WeekplanService]
})
export class WeekplanModule {}
