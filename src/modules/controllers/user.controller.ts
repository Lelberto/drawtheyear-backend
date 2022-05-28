import { Body, Controller, Delete, Get, Param, Patch, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { HateoasService } from '../hateoas/hateoas.service';
import { IdToUserPipe } from '../users/id-to-user.pipe';
import { UpdateUserDto } from '../users/user.dto';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';

/**
 * User controller
 * 
 * Path : `/users`
 */
@ApiTags('users')
@Controller('users')
@UseInterceptors(TransformInterceptor)
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
