import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmotionModule } from 'src/emotions/emotion.module';
import { EmotionRepository } from 'src/emotions/emotion.repository';
import { DayByUserController } from './day-by-user.controller';
import { DayController } from './day.controller';
import { Day } from './day.entity';
import { DayRepository } from './day.repository';
import { DayService } from './day.service';

/**
 * Day module
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Day, DayRepository, EmotionRepository]),
    EmotionModule
  ],
  providers: [DayService],
  controllers: [DayController, DayByUserController]
})
export class DayModule {}
