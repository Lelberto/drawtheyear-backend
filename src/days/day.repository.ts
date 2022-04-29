import { User } from 'src/users/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Day } from './day.entity';

/**
 * Day repository
 */
@EntityRepository(Day)
export class DayRepository extends Repository<Day> {

  /**
   * Finds days by user.
   * 
   * @param userId User ID
   * @returns User's days
   */
  public async findByUser(userId: User['id']): Promise<Day[]> {
    return await this.find({ user: { id: userId } });
  }
}