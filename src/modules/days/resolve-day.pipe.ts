import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import moment from 'moment';
import { UserService } from '../users/user.service';
import { Day } from './day.entity';
import { DayService } from './day.service';

/**
 * Resolve day pipe
 * 
 * This pipe will resolves the day from the username and the day date.
 */
@Injectable()
export class ResolveDayPipe implements PipeTransform<{ username: string, date: string }, Promise<Day>> {

  private readonly userService: UserService;
  private readonly dayService: DayService;

  public constructor(userService: UserService, dayService: DayService) {
    this.userService = userService;
    this.dayService = dayService;
  }

  public async transform(value: { username: string, date: string }): Promise<Day> {
    return await this.dayService.findOne(
      await this.dayService.resolveId(
        await this.userService.findByUsername(value.username), this.transformDate(value.date)
      )
    );
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
