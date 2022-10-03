import { Injectable } from '@nestjs/common';
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
    return await this.userRepo.findOneBy({ id });
  }

  public async findByGoogleId(googleId: string): Promise<User> {
    return await this.userRepo.findOneBy({ googleId });
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.userRepo.findOneBy({ email });
  }

  public async findByUsername(username: string): Promise<User> {
    return await this.userRepo.findOneBy({ username });
  }

  public async resolveId(username: string): Promise<string> {
    return (await this.userRepo.findOneBy({ username })).id
  }

  public async exists(where: FindOptionsWhere<User>): Promise<boolean> {
    return await this.userRepo.countBy(where) > 0;
  }
}
