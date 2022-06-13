import { Body, Controller, Delete, Get, Param, Patch, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PaginationDto } from '../../pagination/pagination.dto';
import { PaginationPipe } from '../../pagination/pagination.pipe';
import { AccessTokenAuthGuard } from '../auth/access-token-auth.guard';
import { UserDaysAction } from '../hateoas/actions/user-days.action';
import { UserEmotionsAction } from '../hateoas/actions/user-emotions.action';
import { UserSelfAction } from '../hateoas/actions/user-self.action';
import { HateoasService } from '../hateoas/hateoas.service';
import { UpdateUserDto } from '../users/user.dto';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { UsernameToIdPipe } from '../users/username-to-id.pipe';
import { UsernameToUserPipe } from '../users/username-to-user.pipe';

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

  @Get('profile')
  @UseGuards(AccessTokenAuthGuard)
  public async profile(@Req() req: Request) {
    const user = req.user as User;
    const links = this.hateoas.createActionBuilder(req)
      .add(new UserEmotionsAction(user.username))
      .add(new UserDaysAction(user.username))
      .build();
    return {
      data: { user: req.user },
      links
    };
  }

  @Get()
  public async find(@Query(PaginationPipe) pagination: PaginationDto) {
    return {
      data: { users: await this.userService.find(pagination) }
    };
  }

  @Get(':username')
  public findById(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User) {
    const links = this.hateoas.createActionBuilder(req)
      .add(new UserEmotionsAction(user.username))
      .add(new UserDaysAction(user.username))
      .build();
    return {
      data: { user },
      links
    };
  }

  @Patch(':username')
  public async update(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User, @Body() body: UpdateUserDto) {
    await this.userService.update(user.id, body);
    const links = this.hateoas.createActionBuilder(req)
      .add(new UserSelfAction(body.username || user.username))
      .build();
    return { links };
  }

  @Delete(':username')
  public async delete(@Param('username', UsernameToIdPipe) id: string) {
    await this.userService.delete(id);
  }
}
