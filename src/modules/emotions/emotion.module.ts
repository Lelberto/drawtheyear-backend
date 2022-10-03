import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmotionService } from './emotion.service';
import { Emotion } from './entities/emotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emotion])],
  exports: [EmotionService],
  providers: [EmotionService]
})
export class EmotionModule {}
