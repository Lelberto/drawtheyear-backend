import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
@UsePipes(ValidationPipe)
export class EmotionByUserController {

  private emotionService: EmotionService;

  public constructor(emotionService: EmotionService) {
    this.emotionService = emotionService;
  }

  @Get()
  public async find(@Param(':userId') userId: User['id']) {
    return await this.emotionService.findByUser(userId);
  }

  @Post()
  public async create(@Param('userId') userId: User['id'], @Body() dto: CreateEmotionDto) {
    return await this.emotionService.create(userId, dto);
  }
}
