import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { EmotionService } from '../../emotions/emotion.service';
import { UpdateEmotionDto } from '../../emotions/entities/emotion.dto';
import { Emotion } from '../../emotions/entities/emotion.entity';
import { ResolveEmotionIdPipe } from '../../emotions/pipes/resolve-emotion-id.pipe';

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

  @Patch(':emotionId')
  public async update(@Param('emotionId', ResolveEmotionIdPipe) emotion: Emotion, @Body() dto: UpdateEmotionDto) {
    await this.emotionService.update(emotion, dto);
    return {
      id: emotion.id
    };
  }
}
