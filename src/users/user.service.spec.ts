import { Test, TestingModule } from '@nestjs/testing';
import { FixtureManager } from '../../test/fixtures/fixtures';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const fixtures = new FixtureManager();
  const user = fixtures.users.createOne();
  const mockRepo: jest.Mocked<Partial<UserRepository>> = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn().mockReturnValue([user]),
    findOneOrFail: jest.fn().mockReturnValue(user),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn().mockReturnValue(1),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockRepo
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user', async () => {
    await service.create(new CreateUserDto());

    expect(mockRepo.create).toBeCalled();
    expect(mockRepo.save).toBeCalled();
  });

  it('should return an array of users', async () => {
    expect(await service.find()).toEqual([user]);
  });

  it('should return an user', async () => {
    expect(await service.findById(user.id)).toEqual(user);
  });

  it('should update an user', async () => {
    await service.update(user.id, new UpdateUserDto());

    expect(mockRepo.update).toBeCalled();
  });

  it('should delete an user', async () => {
    await service.delete(user.id);

    expect(mockRepo.delete).toBeCalled();
  });

  it('should return true if user exists', async () => {
    expect(await service.exists(user.id)).toBeTruthy();
  });
});
