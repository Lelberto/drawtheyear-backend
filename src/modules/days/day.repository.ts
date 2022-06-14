import * as moment from 'moment';
import { EntityRepository, FindOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Day } from './day.entity';

/**
 * Day repository
 */
@EntityRepository(Day)
export class DayRepository extends Repository<Day> {

  /**
   * Resolves the day ID from an user ID and a day date
   * 
   * @param userId User ID
   * @param date Day date
   * @returns Resolved day ID
   * @async
   */
  public async resolveId(userId: User['id'], date: Day['date']): Promise<Day['id']> {
    return (await this.findOne({ user: { id: userId }, date: moment(date).format('YYYY-MM-DD') }, { select: { id: true } }))?.id;
  }

  public findInterval(from: Date, to: Date, options?: FindOptions<Day> | FindOptionsWhere<Day>): Promise<Day[]> {
    return this.find({
      ...options,
      where: {
        date: {
          $between: [from, to]
        }
      }
    });
  }

  /**
   * Checks if day(s) exists
   * 
   * @param ids Day IDs
   * @returns True if the day(s) exists, false otherwise
   * @async
   */
  public async exists(...ids: Day['id'][]): Promise<boolean> {
    return await this.count({ id: { $in: ids } }) === ids.length;
  }
}