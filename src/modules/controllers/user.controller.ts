import { Controller, Get } from '@nestjs/common';
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
}
