import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as moment from 'moment';
import { User } from '../users/user.entity';
import { Day } from './day.entity';
import { DayService } from './day.service';

/**
 * Resolve day ID pipe
 * 
 * This pipe will resolves the day ID from the user ID and the day date.
 */
@Injectable()
export class ResolveDayIdPipe implements PipeTransform<{ userId: User['id'], date: string }, Promise<Day['id']>> {

  private readonly dayService: DayService;

  public constructor(dayService: DayService) {
    this.dayService = dayService;
  }

  public async transform(value: { userId: User['id'], date: string }, metadata: ArgumentMetadata): Promise<Day['id']> {
    return await this.dayService.resolveId(value.userId, this.transformDate(value.date));
  }

  /**
   * Transforms the date param (string) to the corresponding date
   * 
   * @param value Date as string
   * @returns Formatted date
   */
  private transformDate(value: string): Date {
    const date = moment(value, 'YYYY-MM-DD');
    if (!date.isValid()) {
      throw new BadRequestException(`Invalid date: ${value}`);
    }
    return date.toDate();
  }
}
