import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { CreateEmotionDto, UpdateEmotionDto } from './entities/emotion.dto';
import { Emotion } from './entities/emotion.entity';
import { EmotionRepository } from './entities/emotion.repository';

@Injectable()
export class EmotionService {

  private readonly emotionRepo: EmotionRepository;

  public constructor(emotionRepo: EmotionRepository) {
    this.emotionRepo = emotionRepo;
  }

  public async create(dto: CreateEmotionDto, user: User): Promise<Emotion> {
    const emotion = this.emotionRepo.create({ ...dto, user });
    return await this.emotionRepo.save(emotion);
  }

  public async findById(id: string): Promise<Emotion> {
    const emotion = await this.emotionRepo.findOneBy({ id });
    if (!emotion) {
      throw new NotFoundException(`Emotion with ID ${id} not found`);
    }
    return emotion;
  }

  public async findByUser(user: User): Promise<Emotion[]> {
    return await this.emotionRepo.findByUser(user);
  }

  public async findByName(user: User, name: string): Promise<Emotion> {
    return (await this.emotionRepo.findByUser(user)).find(emotion => emotion.name === name);
  }

  public async update(emotion: Emotion, dto: UpdateEmotionDto): Promise<void> {
    await this.emotionRepo.save({ ...emotion, ...dto });
  }

  public async exists(user: User, name: string): Promise<boolean> {
    return await this.emotionRepo.countBy({ user: { id: user.id }, name }) > 0;
  }
}
