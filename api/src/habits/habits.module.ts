import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { Logger } from 'utils/logger';

@Module({
  controllers: [HabitsController],
  providers: [HabitsService, Logger],
})
export class HabitsModule {}
