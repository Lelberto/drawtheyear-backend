import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IdToUserPipe } from './id-to-user.pipe';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

/**
 * User controller
 * 
 * Path : `/users`
 */
@ApiTags('users')
@Controller('users')
@UsePipes(ValidationPipe)
export class UserController {

  private readonly userService: UserService;

  public constructor (userService: UserService) {
    this.userService = userService;
  }

  @Get()
  public async find() {
    return await this.userService.find();
  }

  @Get(':id')
  public findById(@Param('id', IdToUserPipe) user: User) {
    return user;
  }

  @Post()
  public async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    await this.userService.update(id, body);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
