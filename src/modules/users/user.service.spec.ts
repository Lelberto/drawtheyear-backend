import faker from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import mocks from '../../../test/mocks';
import { CreateUserDto, UpdateUserDto } from './entities/user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let mockRepo: jest.Mocked<Partial<UserRepository>>;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockRepo = mocks.createMockUserRepository();

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
    const dto: CreateUserDto = {
      name: 'John'
    };
    
    expect(await service.create(dto)).toEqual<User>({
      id: expect.any(String),
      ...dto
    });
    expect(mockRepo.create).toBeCalledWith(dto);
    expect(mockRepo.save).toBeCalledWith(expect.any(User));
  });

  it('should find users', async () => {
    expect(await service.find()).toEqual(expect.arrayContaining([expect.any(User)]));
    expect(mockRepo.find).toBeCalled();
  });

  it('should find an user', async () => {
    const id = faker.datatype.uuid();

    expect(await service.findById(id)).toEqual(expect.any(User));
    expect(mockRepo.findOne).toBeCalledWith({ id });
  });

  it('should update an user', async () => {
    const id = faker.datatype.uuid();
    const dto: UpdateUserDto = {
      name: 'John'
    }

    await service.update(id, dto);
    expect(mockRepo.count).toBeCalled();
    expect(mockRepo.update).toBeCalledWith({ id }, dto);
  });

  it('should throw error when an user to update does not exists', async () => {
    mockRepo.count.mockResolvedValue(0);

    const id = faker.datatype.uuid();
    const dto: UpdateUserDto = {
      name: 'John'
    }

    await expect(service.update(id, dto)).rejects.toThrow(EntityNotFoundError);
    expect(mockRepo.count).toBeCalled();
    expect(mockRepo.update).not.toBeCalled();
  });

  it('should delete an user', async () => {
    const id = faker.datatype.uuid();

    await service.delete(id);
    expect(mockRepo.count).toBeCalled();
    expect(mockRepo.delete).toBeCalledWith({ id });
  });

  it('should throw error when an user to delete does not exists', async () => {
    mockRepo.count.mockResolvedValue(0);

    const id = faker.datatype.uuid();

    await expect(service.delete(id)).rejects.toThrow(EntityNotFoundError);
    expect(mockRepo.count).toBeCalled();
    expect(mockRepo.delete).not.toBeCalledWith({ id });
  });
});
