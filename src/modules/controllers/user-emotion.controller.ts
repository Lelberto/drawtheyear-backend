import { Body, Controller, Get, Param, Post, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { HateoasService } from '../hateoas/hateoas.service';
import { User } from '../users/user.entity';
import { CreateEmotionDto } from '../emotions/emotion.dto';
import { EmotionService } from '../emotions/emotion.service';
import { EmotionSelfAction } from '../hateoas/actions/emotion-self.action';
import { UserEmotionsAction } from '../hateoas/actions/user-emotions.action';

/**
 * User emotion controller
 * 
 * Path : `/users/:userId/emotions`
 */
@ApiTags('emotions')
@Controller('users/:userId/emotions')
@UseInterceptors(TransformInterceptor)
@UsePipes(ValidationPipe)
export class UserEmotionController {

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
    const links = this.hateoas.createActionBuilder(req)
      .add(new EmotionSelfAction(emotion.id))
      .add(new UserEmotionsAction(userId))
      .build();
    return { emotion, links };
  }
}
