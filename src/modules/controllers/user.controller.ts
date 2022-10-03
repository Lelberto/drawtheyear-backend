import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UpdateUserDto } from '../users/entities/user.dto';
import { User } from '../users/entities/user.entity';
import { ResolveUsernamePipe } from '../users/pipes/resolve-username.pipe';
import { UserService } from '../users/user.service';

@Controller('users')
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
  public async update(@Param('username', ResolveUsernamePipe) user: User, @Body() dto: UpdateUserDto) {
    return await this.userService.update(user, dto);
  }
}
