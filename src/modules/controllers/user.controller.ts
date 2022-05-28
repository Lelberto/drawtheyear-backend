import { Body, Controller, Delete, Get, Param, Patch, Query, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { PaginationDto } from '../../pagination/pagination.dto';
import { PaginationPipe } from '../../pagination/pagination.pipe';
import { UserDaysAction } from '../hateoas/actions/user-days.action';
import { UserEmotionsAction } from '../hateoas/actions/user-emotions.action';
import { UserSelfAction } from '../hateoas/actions/user-self.action';
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
  public async find(@Query(PaginationPipe) pagination: PaginationDto) {
    return { users: await this.userService.find(pagination) };
  }

  @Get(':id')
  public findById(@Req() req: Request, @Param('id', IdToUserPipe) user: User) {
    const links = this.hateoas.createActionBuilder(req)
      .add(new UserEmotionsAction(user.id))
      .add(new UserDaysAction(user.id))
      .build();
    return {
      user,
      links
    };
  }

  @Patch(':id')
  public async update(@Req() req: Request, @Param('id') id: string, @Body() body: UpdateUserDto) {
    await this.userService.update(id, body);
    const links = this.hateoas.createActionBuilder(req)
      .add(new UserSelfAction(id))
      .add(new UserEmotionsAction(id))
      .add(new UserDaysAction(id))
      .build();
    return { links };
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
