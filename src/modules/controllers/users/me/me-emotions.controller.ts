import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from '../../../../common/decorators/user.decorator';
import { AccessTokenAuthGuard } from '../../../auth/guards/jwt/access-token-auth.guard';
import { EmotionService } from '../../../emotions/emotion.service';
import { CreateEmotionDto } from '../../../emotions/entities/emotion.dto';
import { User } from '../../../users/entities/user.entity';

@Controller('me/emotions')
@UseGuards(AccessTokenAuthGuard)
export class MeEmotionsController {

  private readonly emotionService: EmotionService;

  public constructor(emotionService: EmotionService) {
    this.emotionService = emotionService;
  }

  @Post()
  public async create(@AuthUser() authUser: User, @Body() dto: CreateEmotionDto) {
    const emotion = await this.emotionService.create(dto, authUser);
    return {
      id: emotion.id
    };
  }

  @Get()
  public async find(@AuthUser() authUser: User) {
    return {
      data: await this.emotionService.findByUser(authUser)
    };
  }
}
