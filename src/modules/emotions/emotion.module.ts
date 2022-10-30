import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmotionService } from './emotion.service';
import { Emotion } from './entities/emotion.entity';
import { EmotionRepository } from './entities/emotion.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Emotion])],
  exports: [EmotionService],
  providers: [EmotionRepository, EmotionService]
})
export class EmotionModule {}
