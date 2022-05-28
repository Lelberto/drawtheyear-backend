import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/user.module';
import { Emotion } from './emotion.entity';
import { EmotionRepository } from './emotion.repository';
import { EmotionService } from './emotion.service';

/**
 * Emotion module
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Emotion, EmotionRepository]),
    UserModule
  ],
  providers: [EmotionService],
  exports: [EmotionService]
})
export class EmotionModule {}
