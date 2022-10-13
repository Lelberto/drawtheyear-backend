import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { EmotionModule } from '../emotions/emotion.module';
import { DayService } from './day.service';
import { Day } from './entities/day.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Day]), AuthModule, EmotionModule],
  exports: [DayService],
  providers: [DayService]
})
export class DayModule {}
