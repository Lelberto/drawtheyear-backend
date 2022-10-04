import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { validate } from 'class-validator';
import { FindOptionsWhere } from 'typeorm';
import userConfig, { UserConfig } from '../config/user.config';
import { CreateUserDto, UpdateUserDto } from './entities/user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UserService {
  
  private readonly userRepo: UserRepository;
  private readonly config: ConfigType<UserConfig>;

  public constructor(userRepo: UserRepository, @Inject(userConfig.KEY) config: ConfigType<UserConfig>) {
    this.userRepo = userRepo;
    this.config = config;
  }

  public async create(dto: CreateUserDto): Promise<User> {
    console.log(dto, await validate(dto)); // TODO Resolve validation
    const user = this.userRepo.create(dto);
    return await this.userRepo.save(user);
  }

  public async find(): Promise<User[]> {
    return await this.userRepo.find();
  }

  public async findById(id: string): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  public async findByGoogleId(googleId: string): Promise<User> {
    const user = await this.userRepo.findOneBy({ googleId });
    if (!user) {
      throw new NotFoundException(`User with Google ID ${googleId} not found`);
    }
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  public async findByUsername(username: string): Promise<User> {
    const user = await this.userRepo.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  public async update(user: User, dto: UpdateUserDto): Promise<User> {
    if (dto.username) {
      if (user.usernameChangeCountToday === this.config.usernameMaxChangeCountPerDay) {
        throw new BadRequestException(`Username has been updated too many times for today`);
      }
      dto.username = await this.generateUsername(dto.username);
      user.usernameChangeCountToday++;
    }
    return await this.userRepo.save({ ...user, ...dto });
  }

  public async resolveId(username: string): Promise<string> {
    return (await this.findByUsername(username)).id
  }

  public async exists(where: FindOptionsWhere<User>): Promise<boolean> {
    return await this.userRepo.countBy(where) > 0;
  }

  public async generateUsername(name: string): Promise<string> {
    let username = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substring(0, 16);
    let num = 0;
    while (await this.exists({ username })) {
      if (num === 10) {
        throw new InternalServerErrorException(`The server could not generate an username for ${name}, all usernames are taken`);
      }
      username = username.substring(0, 15) + num;
      num++;
    }
    return username;
  }

  public async resetUsernameChangeCount(): Promise<number> {
    const affected = await this.userRepo.resetUsernameChangeCount();
    console.log(`Username change count has been reset for ${affected} user${affected === 1 ? '' : 's'}`);
    return affected;
  }
}
