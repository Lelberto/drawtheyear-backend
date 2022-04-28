import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateEmotionDto } from 'src/emotions/emotion.dto';
import { EmotionService } from 'src/emotions/emotion.service';
import { User } from '../users/user.entity';

/**
 * Emotion by user controller
 * 
 * Path : `/users/:userId/emotions`
 */
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
