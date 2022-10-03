import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateEmotionDto } from './entities/emotion.dto';
import { Emotion } from './entities/emotion.entity';

@Injectable()
export class EmotionService {

  private readonly emotionRepo: Repository<Emotion>;

  public constructor(@InjectRepository(Emotion) emotionRepo: Repository<Emotion>) {
    this.emotionRepo = emotionRepo;
  }

  public async create(dto: CreateEmotionDto, user: User): Promise<Emotion> {
    const emotion = this.emotionRepo.create({ ...dto, user });
    await this.emotionRepo.save(emotion);
    return emotion;
  }

  public async find(): Promise<Emotion[]> {
    return await this.emotionRepo.find();
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
}
