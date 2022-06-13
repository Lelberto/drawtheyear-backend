import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UpdateEmotionDto } from '../emotions/emotion.dto';
import { Emotion } from '../emotions/emotion.entity';
import { EmotionService } from '../emotions/emotion.service';
import { IdToEmotionPipe } from '../emotions/id-to-emotion.pipe';
import { EmotionSelfAction } from '../hateoas/actions/emotion-self.action';
import { UserEmotionsAction } from '../hateoas/actions/user-emotions.action';
import { UserSelfAction } from '../hateoas/actions/user-self.action';
import { HateoasService } from '../hateoas/hateoas.service';

/**
 * Emotion controller
 * 
 * Path : `/emotions`
 */
@ApiTags('emotions')
@Controller('emotions')
@UsePipes(ValidationPipe)
export class EmotionController {

  private readonly emotionService: EmotionService;
  private readonly hateoas: HateoasService;

  public constructor(emotionService: EmotionService, hateoas: HateoasService) {
    this.emotionService = emotionService;
    this.hateoas = hateoas;
  }

  @Get(':id')
  public async findById(@Req() req: Request, @Param('id', IdToEmotionPipe) emotion: Emotion) {
    emotion._links = this.hateoas.createActionBuilder(req)
      .add(new EmotionSelfAction(emotion.id))
      .add(new UserEmotionsAction(emotion.userId))
      .add(new UserSelfAction(emotion.userId))
      .build();
    return {
      data: { emotion }
    };
  }

  @Patch(':id')
  public async update(@Req() req: Request, @Param('id', IdToEmotionPipe) emotion: Emotion, @Body() body: UpdateEmotionDto = {}) {
    await this.emotionService.update(emotion.id, body);
    emotion._links = this.hateoas.createActionBuilder(req)
      .add(new EmotionSelfAction(emotion.id))
      .add(new UserEmotionsAction(emotion.userId))
      .add(new UserSelfAction(emotion.userId))
      .build();
    return { emotion };
  }

  @Delete(':id')
  @HttpCode(204)
  public async delete(@Param('id') id: string) {
    await this.emotionService.delete(id);
  }
}
