import { Test, TestingModule } from '@nestjs/testing';
import mocks from '../../test/mocks';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const mockRepo = mocks.userRepository;

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
    const dto: CreateUserDto = {
      name: 'John'
    };
    
    expect(await service.create(dto)).toEqual<Partial<User>>({
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
    expect(await service.findById('1')).toEqual<Partial<User>>({

    }
  });
});
