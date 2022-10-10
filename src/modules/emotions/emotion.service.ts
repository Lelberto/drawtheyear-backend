import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateEmotionDto, UpdateEmotionDto } from './entities/emotion.dto';
import { Emotion } from './entities/emotion.entity';

@Injectable()
export class EmotionService {

  private readonly emotionRepo: Repository<Emotion>;

  public constructor(@InjectRepository(Emotion) emotionRepo: Repository<Emotion>) {
    this.emotionRepo = emotionRepo;
  }

  public async create(dto: CreateEmotionDto, user: User): Promise<Emotion> {
    const emotion = this.emotionRepo.create({ ...dto, user });
    return await this.emotionRepo.save(emotion);
  }

  public async find(where?: FindManyOptions<Emotion>): Promise<Emotion[]> {
    return await this.emotionRepo.find(where);
  }

  public async findById(id: string): Promise<Emotion> {
    const emotion = await this.emotionRepo.findOneBy({ id });
    if (!emotion) {
      throw new NotFoundException(`Emotion with ID ${id} not found`);
    }
    return emotion;
  }

  public async findByUser(user: User): Promise<Emotion[]> {
    return await this.emotionRepo.findBy({ user });
  }

  public async findByName(user: User, name: string): Promise<Emotion> {
    return await this.emotionRepo.findOneBy({ user, name });
  }

  public async update(emotion: Emotion, dto: UpdateEmotionDto): Promise<void> {
    await this.emotionRepo.save({ ...emotion, ...dto });
  }

  public async exists(where: FindOptionsWhere<Emotion>): Promise<boolean> {
    return await this.emotionRepo.countBy(where) > 0;
  }
}
