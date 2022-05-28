import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmotionModule } from '../emotions/emotion.module';
import { UserModule } from '../users/user.module';
import { Day } from './day.entity';
import { DayRepository } from './day.repository';
import { DayService } from './day.service';

/**
 * Day module
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Day, DayRepository]),
    UserModule,
    EmotionModule
  ],
  providers: [DayService],
  exports: [DayService]
})
export class DayModule {}
