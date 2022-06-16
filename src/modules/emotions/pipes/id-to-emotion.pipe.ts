import { Injectable, PipeTransform } from '@nestjs/common';
import { Emotion } from '../entities/emotion.entity';
import { EmotionService } from '../emotion.service';

/**
 * ID to emotion pipe
 * 
 * Used to transform an emotion ID to the corresponding emotion.
 */
@Injectable()
export class IdToEmotionPipe implements PipeTransform<string, Promise<Emotion>> {

  private readonly emotionService: EmotionService;

  public constructor(emotionService: EmotionService) {
    this.emotionService = emotionService;
  }

  public async transform(id: string): Promise<Emotion> {
    return await this.emotionService.findOne(id);
  }
}
