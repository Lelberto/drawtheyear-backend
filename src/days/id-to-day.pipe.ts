import { PipeTransform } from '@nestjs/common';
import { Day } from './day.entity';
import { DayService } from './day.service';

/**
 * ID to emotion pipe
 * 
 * Used to transform an emotion ID to the corresponding emotion.
 */
export class IdToDayPipe implements PipeTransform<string, Promise<Day>> {
  
  private readonly dayService: DayService;

  public constructor(dayService: DayService) {
    this.dayService = dayService;
  }

  public async transform(id: string): Promise<Day> {
    return await this.dayService.findById(id);
  }
}