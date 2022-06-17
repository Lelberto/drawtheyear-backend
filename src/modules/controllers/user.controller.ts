import { Body, Controller, Delete, Get, Param, Patch, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PaginationDto } from '../../pagination/pagination.dto';
import { PaginationPipe } from '../../pagination/pagination.pipe';
import { AccessTokenAuthGuard } from '../auth/jwt/guards/access-token-auth.guard';
import { AppConfig } from '../config/app';
import { UserDaysAction } from '../hateoas/actions/user-days.action';
import { UserEmotionsAction } from '../hateoas/actions/user-emotions.action';
import { UserSelfAction } from '../hateoas/actions/user-self.action';
import { HateoasService } from '../hateoas/hateoas.service';
import { UpdateUserDto } from '../users/entities/user.dto';
import { User } from '../users/entities/user.entity';
import { UsernameToUserPipe } from '../users/pipes/username-to-user.pipe';
import { UserService } from '../users/user.service';

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
  private readonly appConfig: AppConfig;

  public constructor (userService: UserService, hateoas: HateoasService, config: ConfigService) {
    this.userService = userService;
    this.hateoas = hateoas;
    this.appConfig = config.get('app');
  }

  @Get('profile')
  @UseGuards(AccessTokenAuthGuard)
  public async profile(@Req() req: Request) {
    const user = req.user as User;
    const actions = this.hateoas.createActionBuilder(req)
      .add(new UserEmotionsAction(user.username))
      .add(new UserEmotionsAction(user.username));
    for (let year = this.appConfig.days.startYear; year <= new Date().getFullYear(); year++) {
      actions.add(new UserDaysAction(user.username, year));
    }
    user._links = actions.build();
    return {
      data: { user: req.user }
    };
  }

  @Get()
  public async find(@Req() req: Request, @Query(PaginationPipe) pagination: PaginationDto) {
    return {
      data: {
        users: (await this.userService.find(pagination)).map(user => {
          const actions = this.hateoas.createActionBuilder(req)
            .add(new UserEmotionsAction(user.username))
            .add(new UserEmotionsAction(user.username));
          for (let year = this.appConfig.days.startYear; year <= new Date().getFullYear(); year++) {
            actions.add(new UserDaysAction(user.username, year));
          }
          user._links = actions.build();
          return user;
        })
      }
    };
  }

  @Get(':username')
  public findById(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User) {
    const actions = this.hateoas.createActionBuilder(req)
      .add(new UserEmotionsAction(user.username))
      .add(new UserEmotionsAction(user.username));
    for (let year = this.appConfig.days.startYear; year <= new Date().getFullYear(); year++) {
      actions.add(new UserDaysAction(user.username, year));
    }
    user._links = actions.build();
    return {
      data: { user }
    };
  }

  @Patch(':username')
  public async update(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User, @Body() body: UpdateUserDto) {
    await this.userService.update(user, body);
    user._links = this.hateoas.createActionBuilder(req)
      .add(new UserSelfAction(body.username || user.username))
      .build();
    return { user };
  }

  @Delete(':username')
  public async delete(@Param('username', UsernameToUserPipe) user: User) {
    await this.userService.delete(user);
  }
}
