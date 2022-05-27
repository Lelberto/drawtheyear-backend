import { Body, Controller, Get, Param, Post, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { HateoasService } from '../hateoas/hateoas.service';
import { User } from '../users/user.entity';
import { CreateEmotionDto } from './emotion.dto';
import { EmotionService } from './emotion.service';

/**
 * Emotion by user controller
 * 
 * Path : `/users/:userId/emotions`
 */
@ApiTags('emotions')
@Controller('users/:userId/emotions')
@UseInterceptors(TransformInterceptor)
@UsePipes(ValidationPipe)
export class EmotionByUserController {

  private readonly emotionService: EmotionService;
  private readonly hateoas: HateoasService;

  public constructor(emotionService: EmotionService, hateoas: HateoasService) {
    this.emotionService = emotionService;
    this.hateoas = hateoas;
  }

  @Get()
  public async find(@Param('userId') userId: User['id']) {
    return { emotions: await this.emotionService.findByUser(userId) };
  }

  @Post()
  public async create(@Req() req: Request, @Param('userId') userId: User['id'], @Body() dto: CreateEmotionDto) {
    const emotion = await this.emotionService.create(userId, dto);
    return {
      emotion,
      links: [
        this.hateoas.createLink(req, 'emotion-self', { emotionId: emotion.id }),
        this.hateoas.createLink(req, 'user-emotions', { userId }),
      ]
    };
  }
}
