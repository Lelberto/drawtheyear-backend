import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emotion } from './emotion.entity';
import { EmotionService } from './emotion.service';
import { EmotionController } from './emotion.controller';
import { EmotionRepository } from './emotion.repository';
import { EmotionByUserController } from './emotion-by-user.controller';

/**
 * Emotion module
 */
@Module({
  imports: [TypeOrmModule.forFeature([Emotion, EmotionRepository])],
  providers: [EmotionService],
  controllers: [EmotionController, EmotionByUserController],
  exports: [EmotionService]
})
export class EmotionModule {}
