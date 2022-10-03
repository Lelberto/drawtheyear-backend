import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/entities/user.dto';
import { UserService } from '../users/user.service';

@Controller('users')
export class UserController {

  private readonly userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  @Post()
  public async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Get()
  public async find() {
    return await this.userService.find();
  }
}
