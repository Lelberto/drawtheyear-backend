import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { PaginationDto } from '../../pagination/pagination.dto';
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
   * Resolves the user ID from an username
   * 
   * @param username Username
   * @returns Resolved user ID
   * @async
   */
  public async resolveId(username: string): Promise<User['id']> {
    return await this.userRepo.resolveId(username);
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
   * Finds users
   * 
   * @param pagination Pagination
   * @returns Users
   * @async
   */
  public async find(pagination: PaginationDto): Promise<User[]> {
    return await this.userRepo.find({ skip: pagination.offset, take: pagination.limit });
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
    const user = await this.userRepo.findOne({ id });
    return user;
  }

  /**
   * Finds an user by his Google ID
   * 
   * @param googleId Google user ID
   * @returns User
   * @throws NotFoundException If the user is not found
   * @async
   */
  public async findByGoogleId(googleId: User['googleId']): Promise<User> {
    const user = await this.userRepo.findOne({ googleId });
    return user;
  }
  
  /**
   * Finds an user by his username
   * 
   * @param username Username
   * @returns User
   * @throws NotFoundException If the user is not found
   * @async
   */
  public async findByUsername(username: string): Promise<User> {
    const user = await this.userRepo.findOne({ username });
    return user;
  }

  /**
   * Finds an user by email
   * 
   * @param email User email
   * @returns User
   * @throws NotFoundException If the user is not found
   * @async
   */
  public async findByEmail(email: User['email']): Promise<User> {
    const user = await this.userRepo.findOne({ email });
    return user;
  }

  /**
   * Updates an user
   * 
   * @param id User ID
   * @param dto DTO
   * @async
   */
  public async update(id: User['id'], dto: UpdateUserDto): Promise<void> {
    await this.userRepo.update({ id }, dto);
  }

  /**
   * Deletes an user
   * 
   * @param id User ID
   * @async
   */
  public async delete(id: User['id']): Promise<void> {
    await this.userRepo.delete({ id });
  }

  /**
   * Checks if user(s) exists
   * 
   * @param ids User IDs
   * @returns True if the user(s) exists, false otherwise
   * @async
   */
  public async exists(...ids: User['id'][]): Promise<boolean> {
    return await this.userRepo.exists(...ids);
  }

  // TODO Update ID generation to avoid infinite loops if all tags have been reached
  /**
   * Generates an unique username from a given base
   * 
   * The username generation algorithm will search if the base username exists
   * in the database. If it does, it will append a random tag (4 digits) to
   * the base username.
   * 
   * @param username Base username
   * @returns Unique generated username
   * @async
   * @recursive
   */
  public async generateUsername(username: string): Promise<string> {
    username = username.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substring(0, 30);
    const existingUser = await this.userRepo.findOne({ username });
    if (existingUser) {
      const existingUsernameLength = existingUser.username.length;
      const existingUsername = existingUsernameLength > 26
        ? existingUser.username.substring(0, 26)
        : existingUser.username;
      const randomTag = _.padStart(_.random(0, 9999).toFixed(), 4, '0');
      return await this.generateUsername(`${existingUsername}${randomTag}`);
    }
    return username;
  }
}
