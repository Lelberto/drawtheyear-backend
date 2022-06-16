import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emotion } from './entities/emotion.entity';
import { EmotionRepository } from './entities/emotion.repository';
import { EmotionService } from './emotion.service';

/**
 * Emotion module
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Emotion, EmotionRepository])
  ],
  providers: [EmotionService],
  exports: [EmotionService]
})
export class EmotionModule {}
