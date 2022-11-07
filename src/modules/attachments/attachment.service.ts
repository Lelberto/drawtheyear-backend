import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Day } from '../days/entities/day.entity';
import { CreateAttachmentDto } from './entities/attachment.dto';
import { Attachment } from './entities/attachment.entity';

@Injectable()
export class AttachmentService {

  public attachmentRepo: Repository<Attachment>;

  public constructor(@InjectRepository(Attachment) attachmentRepo: Repository<Attachment>) {
    this.attachmentRepo = attachmentRepo;
  }

  public async create(day: Day, dto: CreateAttachmentDto): Promise<Attachment> {
    const attachment = this.attachmentRepo.create({ ...dto, day });
    return await this.attachmentRepo.save(attachment);
  }

  public async findByDay(day: Day): Promise<Attachment[]> {
    return await this.attachmentRepo.findBy({ day: { id: day.id } })
  }

  public async findById(id: string): Promise<Attachment> {
    const attachment = await this.attachmentRepo.findOneBy({ id });
    if (!attachment) {
      throw new NotFoundException(`Attachment with ID ${id} not found`);
    }
    return attachment;
  }
}
