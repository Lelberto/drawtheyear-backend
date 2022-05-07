import { CreateUserDto } from '../../src/users/user.dto';
import { User } from '../../src/users/user.entity';
import { UserRepository } from '../../src/users/user.repository';
import { FixtureManager } from '../fixtures/fixtures';

const fixtures = new FixtureManager();

/**
 * Creates a mock of `UserRepository`
 * 
 * @returns Mocked `UserRepository`
 */
export default function createMock(): jest.Mocked<Partial<UserRepository>> {
  return {
    create: jest.fn().mockImplementation((dto: CreateUserDto) => fixtures.users.createOne(dto)),
    find: jest.fn().mockReturnValue(fixtures.users.createMany()),
    findOneOrFail: jest.fn().mockReturnValue(fixtures.users.createOne()),
    save: jest.fn().mockImplementation((user: User) => user),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn().mockReturnValue(1)
  };
}
