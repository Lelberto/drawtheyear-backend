import { Controller, Get, Param } from '@nestjs/common';
import { EmotionService } from './emotion.service';
import { Emotion } from './entities/emotion.entity';
import { ResolveEmotionPipe } from './pipes/resolve-emotion.pipe';

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
