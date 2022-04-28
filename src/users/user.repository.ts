import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

/**
 * User repository
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {}
