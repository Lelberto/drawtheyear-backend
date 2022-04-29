import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayByUserController } from './day-by-user.controller';
import { DayController } from './day.controller';
import { Day } from './day.entity';
import { DayRepository } from './day.repository';
import { DayService as DayService } from './day.service';

/**
 * Day module
 */
@Module({
  imports: [TypeOrmModule.forFeature([Day, DayRepository])],
  providers: [DayService],
  controllers: [DayController, DayByUserController]
})
export class DayModule {}
