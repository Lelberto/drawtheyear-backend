import { Body, Controller, Get, Param, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateEmotionDto } from './emotion.dto';
import { Emotion } from './emotion.entity';
import { EmotionService } from './emotion.service';
import { IdToEmotionPipe } from './id-to-emotion.pipe';

/**
 * Emotion controller
 * 
 * Path : `/emotions`
 */
@ApiTags('emotions')
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

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateEmotionDto) {
    await this.emotionService.update(id, body);
  }
}
