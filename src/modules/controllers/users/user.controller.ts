import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsePermissions } from '../../../common/decorators/auth/use-permissions.decorator';
import { Permission } from '../../../common/types/role.types';
import { AccessTokenAuthGuard } from '../../auth/guards/jwt/access-token-auth.guard';
import { RoleGuard } from '../../auth/guards/roles/role.guard';
import { UpdateUserDto } from '../../users/entities/user.dto';
import { User } from '../../users/entities/user.entity';
import { ResolveUsernamePipe } from '../../users/pipes/resolve-username.pipe';
import { UserService } from '../../users/user.service';

@Controller('users')
@UseGuards(AccessTokenAuthGuard, RoleGuard)
export class UserController {

  private readonly userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get()
  public async find() {
    return await this.userService.find();
  }

  @Patch(':username')
  @UsePermissions(Permission.USER_UPDATE)
  public async update(@Param('username', ResolveUsernamePipe) user: User, @Body() dto: UpdateUserDto) {
    await this.userService.update(user, dto);
    return {
      id: user.id
    };
  }
}
