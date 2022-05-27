import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { HateoasService } from '../hateoas/hateoas.service';
import { UserService } from '../users/user.service';
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
@UseInterceptors(TransformInterceptor)
@UsePipes(ValidationPipe)
export class EmotionController {

  private readonly emotionService: EmotionService;
  private readonly userService: UserService;
  private readonly hateoas: HateoasService;

  public constructor(emotionService: EmotionService, userService: UserService, hateoas: HateoasService) {
    this.emotionService = emotionService;
    this.userService = userService;
    this.hateoas = hateoas;
  }

  @Get(':id')
  public async findById(@Req() req: Request, @Param('id', IdToEmotionPipe) emotion: Emotion) {
    const user = await this.userService.findById(emotion.userId);
    return {
      emotion,
      links: [
        this.hateoas.createLink(req, 'emotion-self', { emotionId: emotion.id }),
        this.hateoas.createLink(req, 'user-self', { userId: user.id }),
        this.hateoas.createLink(req, 'user-emotions', { userId: user.id })
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
