import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { EmotionService } from '../emotion.service';
import { Emotion } from '../entities/emotion.entity';

@Injectable()
export class ResolveEmotionPipe implements PipeTransform<string, Promise<Emotion>> {

  private readonly emotionService: EmotionService;

  public constructor(emotionService: EmotionService) {
    this.emotionService = emotionService;
  }

  public async transform(value: string, metadata: ArgumentMetadata): Promise<Emotion> {
    return await this.emotionService.findById(value);
  }
}
