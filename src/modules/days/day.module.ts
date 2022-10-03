import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmotionModule } from '../emotions/emotion.module';
import { DayService } from './day.service';
import { Day } from './entities/day.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Day]), EmotionModule],
  exports: [DayService],
  providers: [DayService]
})
export class DayModule {}
