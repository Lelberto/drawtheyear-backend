import { Body, Controller, Get, Param, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PaginationDto } from '../../pagination/pagination.dto';
import { PaginationPipe } from '../../pagination/pagination.pipe';
import { CreateEmotionDto } from '../emotions/emotion.dto';
import { EmotionService } from '../emotions/emotion.service';
import { EmotionSelfAction } from '../hateoas/actions/emotion-self.action';
import { UserSelfAction } from '../hateoas/actions/user-self.action';
import { HateoasService } from '../hateoas/hateoas.service';
import { User } from '../users/user.entity';
import { UsernameToUserPipe } from '../users/username-to-user.pipe';

/**
 * User emotion controller
 * 
 * Path : `/users/:username/emotions`
 */
@ApiTags('emotions')
@Controller('users/:username/emotions')
@UsePipes(ValidationPipe)
export class UserEmotionController {

  private readonly emotionService: EmotionService;
  private readonly hateoas: HateoasService;

  public constructor(emotionService: EmotionService, hateoas: HateoasService) {
    this.emotionService = emotionService;
    this.hateoas = hateoas;
  }

  @Get()
  public async find(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User, @Query(PaginationPipe) pagination: PaginationDto) {
    user._links = this.hateoas.createActionBuilder(req)
      .add(new UserSelfAction(user.username))
      .build();
    return {
      data: {
        emotions: (await this.emotionService.findByUser(user.id, pagination)).map(emotion => {
          emotion._links = this.hateoas.createActionBuilder(req)
            .add(new EmotionSelfAction(emotion.id))
            .build();
          return emotion;
        })
      }
    };
  }

  @Post()
  public async create(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User, @Body() dto: CreateEmotionDto) {
    const emotion = await this.emotionService.create(user.id, dto);
    emotion._links = this.hateoas.createActionBuilder(req)
      .add(new EmotionSelfAction(emotion.id))
      .build();
    return {
      data: { emotion }
    };
  }
}
