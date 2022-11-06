import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { EmotionModule } from '../emotions/emotion.module';
import { DayService } from './day.service';
import { DayEmotion } from './entities/day-emotion.entity';
import { DayEmotionRepository } from './entities/day-emotion.repository';
import { Day } from './entities/day.entity';
import { DayRepository } from './entities/day.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Day, DayEmotion]), AuthModule, EmotionModule],
  exports: [DayService],
  providers: [DayRepository, DayEmotionRepository, DayService]
})
export class DayModule {}
