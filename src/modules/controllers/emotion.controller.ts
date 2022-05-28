import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { HateoasService } from '../hateoas/hateoas.service';
import { UserService } from '../users/user.service';
import { UpdateEmotionDto } from '../emotions/emotion.dto';
import { Emotion } from '../emotions/emotion.entity';
import { EmotionService } from '../emotions/emotion.service';
import { IdToEmotionPipe } from '../emotions/id-to-emotion.pipe';
import { EmotionSelfAction } from '../hateoas/actions/emotion-self.action';
import { UserSelfAction } from '../hateoas/actions/user-self.action';
import { UserEmotionsAction } from '../hateoas/actions/user-emotions.action';

/**
 * Emotion controller
 * 
 * Path : `/emotions`
 */
@ApiTags('emotions')
@Controller('emotions')
@UseInterceptors(TransformInterceptor)
@UsePipes(ValidationPipe)
export class EmotionController {

  private readonly emotionService: EmotionService;
  private readonly userService: UserService;
  private readonly hateoas: HateoasService;

  public constructor(emotionService: EmotionService, userService: UserService, hateoas: HateoasService) {
    this.emotionService = emotionService;
    this.userService = userService;
    this.hateoas = hateoas;
  }

  @Get(':id')
  public async findById(@Req() req: Request, @Param('id', IdToEmotionPipe) emotion: Emotion) {
    const user = await this.userService.findById(emotion.userId);
    const links = this.hateoas.createActionBuilder(req)
      .add(new EmotionSelfAction(emotion.id))
      .add(new UserSelfAction(user.id))
      .add(new UserEmotionsAction(user.id))
      .build();
    return {
      emotion,
      links
    };
  }

  @Patch(':id')
  public async update(@Req() req: Request, @Param('id') id: string, @Body() body: UpdateEmotionDto = {}) {
    await this.emotionService.update(id, body);
    const links = this.hateoas.createActionBuilder(req)
      .add(new EmotionSelfAction(id))
      .build();
    return { links };
  }

  @Delete(':id')
  @HttpCode(204)
  public async delete(@Param('id') id: string) {
    await this.emotionService.delete(id);
  }
}
