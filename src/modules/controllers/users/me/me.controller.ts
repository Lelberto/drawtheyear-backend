import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthUser } from '../../../../common/decorators/user.decorator';
import { AccessTokenAuthGuard } from '../../../auth/guards/jwt/access-token-auth.guard';
import { UpdateUserDto } from '../../../users/entities/user.dto';
import { User } from '../../../users/entities/user.entity';
import { UserService } from '../../../users/user.service';

@Controller('me')
@UseGuards(AccessTokenAuthGuard)
export class MeController {

  private readonly userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get()
  public async find(@AuthUser() authUser: User) {
    return {
      data: authUser
    };
  }

  @Patch()
  public async update(@AuthUser() authUser: User, @Body() dto: UpdateUserDto) {
    await this.userService.update(authUser, dto);
    return {
      id: authUser.id
    };
  }
}
