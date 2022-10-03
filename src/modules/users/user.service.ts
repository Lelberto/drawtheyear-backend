import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './entities/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  
  private readonly userRepo: Repository<User>;

  public constructor(@InjectRepository(User) userRepo: Repository<User>) {
    this.userRepo = userRepo;
  }

  public async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(dto);
    await this.userRepo.save(user);
    return user;
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

  public async resolveId(username: string): Promise<string> {
    return (await this.findByUsername(username)).id
  }

  public async exists(where: FindOptionsWhere<User>): Promise<boolean> {
    return await this.userRepo.countBy(where) > 0;
  }
}
