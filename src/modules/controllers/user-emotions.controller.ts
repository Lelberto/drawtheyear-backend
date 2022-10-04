import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmotionService } from '../emotions/emotion.service';
import { CreateEmotionDto } from '../emotions/entities/emotion.dto';
import { User } from '../users/entities/user.entity';
import { ResolveUsernamePipe } from '../users/pipes/resolve-username.pipe';

@Controller('users/:username/emotions')
export class UserEmotionsController {

  private readonly emotionService: EmotionService;

  public constructor(emotionService: EmotionService) {
    this.emotionService = emotionService;
  }

  @Post()
  public async create(@Param('username', ResolveUsernamePipe) user: User, @Body() dto: CreateEmotionDto) {
    return await this.emotionService.create(dto, user);
  }

  @Get()
  public async find(@Param('username', ResolveUsernamePipe) user: User) {
    return await this.emotionService.findByUser(user);
  }
}
