import { Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { Emotion } from './emotion.entity';
import { EmotionService } from './emotion.service';
import { IdToEmotionPipe } from './id-to-emotion.pipe';

/**
 * Emotion controller
 * 
 * Path : `/emotions`
 */
@Controller('emotions')
@UsePipes(ValidationPipe)
export class EmotionController {

  private emotionService: EmotionService;

  public constructor(emotionService: EmotionService) {
    this.emotionService = emotionService;
  }

  @Get()
  public async find() {
    return await this.emotionService.find();
  }

  @Get(':id')
  public async findById(@Param('id', IdToEmotionPipe) emotion: Emotion) {
    return emotion;
  }
}
