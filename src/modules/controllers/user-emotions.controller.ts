import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmotionService } from '../emotions/emotion.service';
import { CreateEmotionDto } from '../emotions/entities/emotion.dto';
import { User } from '../users/entities/user.entity';
import { ResolveUserPipe } from '../users/pipes/resolve-user.pipe';
import { UserService } from '../users/user.service';

@Controller('users/:userId/emotions')
export class UserEmotionsController {

  private readonly userService: UserService;
  private readonly emotionService: EmotionService;

  public constructor(userService: UserService, emotionService: EmotionService) {
    this.userService = userService;
    this.emotionService = emotionService;
  }

  @Post()
  public async create(@Param('userId', ResolveUserPipe) user: User, @Body() dto: CreateEmotionDto) {
    return await this.emotionService.create(dto, user);
  }

  @Get()
  public async find(@Param('userId', ResolveUserPipe) user: User) {
    return await this.emotionService.findByUser(user);
  }
}
