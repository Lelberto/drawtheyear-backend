import faker from '@faker-js/faker';
import { CreateUserDto } from '../../src/users/user.dto';
import { User } from '../../src/users/user.entity';
import { Fixture } from './fixture';

/**
 * User fixture class
 */
export class UserFixture extends Fixture<User, CreateUserDto> {

  /** Reference for all user fixtures */
  public static REF_USERS = 'users';

  public constructor(references: Map<string, any>) {
    super(references);
    this.setReference(UserFixture.REF_USERS, []);
  }

  public createOne(dto?: CreateUserDto): User {
    const user = new User();

    user.id = faker.datatype.uuid();
    user.name = dto?.name || faker.name.firstName();

    this.getReference<User[]>(UserFixture.REF_USERS).push(user);
    
    return user;
  }

  public createMany(count = 10): User[] {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
      users.push(this.createOne());
    }
    return users;
  }
}
