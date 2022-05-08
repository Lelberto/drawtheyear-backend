import * as moment from 'moment';
import { EntityRepository, Repository } from 'typeorm';
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
    return (await this.findOneOrFail({ user: { id: userId }, date: moment(date).format('YYYY-MM-DD') }, { select: { id: true } })).id;
  }

  /**
   * Finds days by user.
   * 
   * @param userId User ID
   * @returns User's days
   */
  public async findByUser(userId: User['id']): Promise<Day[]> {
    return await this.find({ user: { id: userId } });
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