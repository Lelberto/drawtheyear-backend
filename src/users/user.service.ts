import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

/**
 * User service
 */
@Injectable()
export class UserService {

  private readonly userRepo: UserRepository;

  public constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  /**
   * Creates a new user
   * 
   * @param dto DTO
   * @returns Created user
   * @async
   */
  public async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(dto);
    await this.userRepo.save(user);
    return user;
  }

  /**
   * Finds all users
   * 
   * @returns All users
   */
  public async find(): Promise<User[]> {
    return await this.userRepo.find();
  }

  /**
   * Finds an user
   * 
   * @param id User ID
   * @returns User
   * @throws NotFoundException If the user is not found
   * @async
   */
  public async findById(id: User['id']): Promise<User> {
    const user = await this.userRepo.findOneOrFail({ id });
    return user;
  }

  /**
   * Updates an user
   * 
   * @param id User ID
   * @param dto DTO
   * @throws NotFoundException If the user is not found
   * @async
   */
  public async update(id: User['id'], dto: UpdateUserDto): Promise<void> {
    if (!await this.exists(id)) {
      throw new EntityNotFoundError(User, id);
    }
    await this.userRepo.update({ id }, dto);
  }

  /**
   * Deletes an user
   * 
   * @param id User ID
   * @throws NotFoundException If the user is not found
   * @async
   */
  public async delete(id: User['id']): Promise<void> {
    if (!await this.exists(id)) {
      throw new EntityNotFoundError(User, id);
    }
    await this.userRepo.delete({ id });
  }

  /**
   * Checks if an user exists
   * 
   * @param id User ID
   * @returns True if the user exists, false otherwise
   * @async
   */
  public async exists(id: User['id']): Promise<boolean> {
    return await this.userRepo.count({ id }) > 0;
  }
}
