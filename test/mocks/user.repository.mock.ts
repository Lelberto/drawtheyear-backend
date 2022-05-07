import { CreateUserDto } from '../../src/users/user.dto';
import { User } from '../../src/users/user.entity';
import { UserRepository } from '../../src/users/user.repository';
import { FixtureManager } from '../fixtures/fixtures';

const fixtures = new FixtureManager();

export const mockUserRepository: jest.Mocked<Partial<UserRepository>> = {
  create: jest.fn().mockImplementation((dto: CreateUserDto) => fixtures.users.createOne(dto)),
  find: jest.fn().mockReturnValue(fixtures.users.createMany()),
  findOneOrFail: jest.fn().mockImplementation((id: User['id']) => ({  } as User)), // TODO Create fake user for findOne
  save: jest.fn().mockImplementation((user: User) => user),
}
