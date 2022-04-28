import { Repository } from 'typeorm';
import { User } from './user.entity';

/**
 * User repository
 */
export class UserRepository extends Repository<User> {}
