import { Controller, Get, Param } from '@nestjs/common';
import { EmotionService } from '../emotions/emotion.service';
import { Emotion } from '../emotions/entities/emotion.entity';
import { ResolveEmotionPipe } from '../emotions/pipes/resolve-emotion.pipe';

@Controller('emotions')
export class EmotionController {

  private readonly emotionService: EmotionService;

  public constructor(emotionService: EmotionService) {
    this.emotionService = emotionService;
  }

  @Get(':id')
  public async findById(@Param('id', ResolveEmotionPipe) emotion: Emotion) {
    return emotion;
  }
}
