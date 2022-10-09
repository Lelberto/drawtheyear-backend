import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsePermissions } from '../../../common/decorators/auth/use-permissions.decorator';
import { Permission } from '../../../common/types/role.types';
import { AccessTokenAuthGuard } from '../../auth/guards/jwt/access-token-auth.guard';
import { RoleGuard } from '../../auth/guards/roles/role.guard';
import { EmotionService } from '../../emotions/emotion.service';
import { CreateEmotionDto } from '../../emotions/entities/emotion.dto';
import { User } from '../../users/entities/user.entity';
import { ResolveUsernamePipe } from '../../users/pipes/resolve-username.pipe';

@Controller('users/:username/emotions')
@UseGuards(AccessTokenAuthGuard, RoleGuard)
export class UserEmotionsController {

  private readonly emotionService: EmotionService;

  public constructor(emotionService: EmotionService) {
    this.emotionService = emotionService;
  }

  @Post()
  @UsePermissions(Permission.EMOTION_CREATION)
  public async create(@Param('username', ResolveUsernamePipe) user: User, @Body() dto: CreateEmotionDto) {
    const emotion = await this.emotionService.create(dto, user);
    return {
      id: emotion.id
    }
  }

  @Get()
  public async find(@Param('username', ResolveUsernamePipe) user: User) {
    return await this.emotionService.findByUser(user);
  }
}
