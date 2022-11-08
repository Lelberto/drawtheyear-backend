import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Readable } from 'stream';
import { Repository } from 'typeorm';
import { Day } from '../days/entities/day.entity';
import { AttachmentStorageAdapter } from './attachment-storage-adapter';
import { CreateAttachmentDto } from './entities/attachment.dto';
import { Attachment } from './entities/attachment.entity';

@Injectable()
export class AttachmentService {

  private readonly attachmentRepo: Repository<Attachment>;
  private readonly storageAdapter: AttachmentStorageAdapter;

  public constructor(@InjectRepository(Attachment) attachmentRepo: Repository<Attachment>, storageAdapter: AttachmentStorageAdapter) {
    this.attachmentRepo = attachmentRepo;
    this.storageAdapter = storageAdapter;
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

  public async upload(attachment: Attachment, data: Buffer, extension: string, mimeType: string): Promise<void> {
    attachment.path = `${attachment.id}.${extension}`;
    attachment.mimeType = mimeType;
    await this.attachmentRepo.save(attachment);
    await this.storageAdapter.store(attachment, data);
  }

  public async download(attachment: Attachment): Promise<Buffer> {
    if (!attachment.path) {
      throw new NotFoundException(`Attachment with ID ${attachment.id} does not have data`);
    }
    return await this.storageAdapter.download(attachment);
  }

  public stream(attachment: Attachment): Readable {
    if (!attachment.path) {
      throw new NotFoundException(`Attachment with ID ${attachment.id} does not have data`);
    }
    return this.storageAdapter.stream(attachment);
  }
}
