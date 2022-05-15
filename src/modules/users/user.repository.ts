import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

/**
 * User repository
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {

  /**
   * Checks if user(s) exists
   * 
   * @param ids User IDs
   * @returns True if the user(s) exists, false otherwise
   * @async
   */
  public async exists(...ids: User['id'][]): Promise<boolean> {
    return await this.count({ id: { $in: ids } }) === ids.length;
  }
}
