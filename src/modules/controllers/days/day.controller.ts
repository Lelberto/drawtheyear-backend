import { Controller } from '@nestjs/common';
import { DayService } from '../../days/day.service';

@Controller('days')
export class DayController {

  private readonly dayService: DayService;

  public constructor(dayService: DayService) {
    this.dayService = dayService;
  }
}
