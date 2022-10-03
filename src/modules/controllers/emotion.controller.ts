import { Controller, Get, Param } from '@nestjs/common';
import { EmotionService } from '../emotions/emotion.service';
import { Emotion } from '../emotions/entities/emotion.entity';
import { ResolveEmotionIdPipe } from '../emotions/pipes/resolve-emotion-id.pipe';

@Controller('emotions')
export class EmotionController {

  private readonly emotionService: EmotionService;

  public constructor(emotionService: EmotionService) {
    this.emotionService = emotionService;
  }

  @Get(':emotionId')
  public async findById(@Param('emotionId', ResolveEmotionIdPipe) emotion: Emotion) {
    return emotion;
  }
}
