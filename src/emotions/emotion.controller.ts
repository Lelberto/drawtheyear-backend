import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { HateoasService } from '../hateoas/hateoas.service';
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

  private readonly emotionService: EmotionService;
  private readonly hateoas: HateoasService;

  public constructor(emotionService: EmotionService, hateoas: HateoasService) {
    this.emotionService = emotionService;
    this.hateoas = hateoas;
  }

  @Get()
  public async find() {
    return { emotions: await this.emotionService.find() };
  }

  @Get(':id')
  public async findById(@Req() req: Request, @Param('id', IdToEmotionPipe) emotion: Emotion) {
    return {
      emotion,
      links: [
        this.hateoas.createLink(req, 'user-self', { userId: emotion.userId }),
        this.hateoas.createLink(req, 'user-emotions', { userId: emotion.userId })
      ]
    };
  }

  @Patch(':id')
  public async update(@Req() req: Request, @Param('id') id: string, @Body() body: UpdateEmotionDto = {}) {
    await this.emotionService.update(id, body);
    return {
      links: [
        this.hateoas.createLink(req, 'emotion-self', { emotionId: id }),
      ]
    }
  }

  @Delete(':id')
  @HttpCode(204)
  public async delete(@Param('id') id: string) {
    await this.emotionService.delete(id);
  }
}
