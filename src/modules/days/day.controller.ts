import { Controller, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { DayService } from './day.service';

/**
 * Day controller
 * 
 * Path : `/days`
 */
@ApiTags('days')
@Controller('days')
@UseInterceptors(TransformInterceptor)
@UsePipes(ValidationPipe)
export class DayController {

  private readonly dayService: DayService;

  public constructor(dayService: DayService) {
    this.dayService = dayService;
  }
}
