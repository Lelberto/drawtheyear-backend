import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { HateoasService } from '../hateoas/hateoas.service';
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
  private readonly hateoas: HateoasService;

  public constructor (userService: UserService, hateoas: HateoasService) {
    this.userService = userService;
    this.hateoas = hateoas;
  }

  @Get()
  public async find() {
    return { users: await this.userService.find() };
  }

  @Get(':id')
  public findById(@Req() req: Request, @Param('id', IdToUserPipe) user: User) {
    return {
      user,
      links: [
        this.hateoas.createLink(req, 'user-emotions', { userId: user.id }),
        this.hateoas.createLink(req, 'user-days', { userId: user.id })
      ]
    };
  }

  @Post()
  public async create(@Req() req: Request, @Body() body: CreateUserDto) {
    const user = await this.userService.create(body);
    return {
      user,
      links: [
        this.hateoas.createLink(req, 'user-self', { userId: user.id }),
        this.hateoas.createLink(req, 'user-emotions', { userId: user.id }),
        this.hateoas.createLink(req, 'user-days', { userId: user.id })
      ]
    };
  }

  @Patch(':id')
  public async update(@Req() req: Request, @Param('id') id: string, @Body() body: UpdateUserDto) {
    await this.userService.update(id, body);
    return {
      links: [
        this.hateoas.createLink(req, 'user-self', { userId: id }),
        this.hateoas.createLink(req, 'user-emotions', { userId: id }),
        this.hateoas.createLink(req, 'user-days', { userId: id })
      ]
    };
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
