import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

/**
 * User repository
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {

  /**
   * Resolves the user ID an username
   * 
   * @param username Username
   * @returns Resolved user ID
   * @async
   */
   public async resolveId(username: User['username']): Promise<User['id']> {
    return (await this.findOne({ username }, { select: { id: true } }))?.id;
  }

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
