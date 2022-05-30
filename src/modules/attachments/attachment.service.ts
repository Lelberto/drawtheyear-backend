import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import { Day } from '../days/day.entity';
import { AttachmentStorageAdapter } from './attachment-storage.adapter';
import { UpdateAttachmentDto } from './attachment.dto';
import { Attachment } from './attachment.entity';
import { AttachmentRepository } from './attachment.repository';

/**
 * Attachment service
 */
@Injectable()
export class AttachmentService {

  private readonly attachmentRepo: AttachmentRepository;
  private readonly storageAdapter: AttachmentStorageAdapter;

  public constructor(attachmentsRepo: AttachmentRepository, storageAdapter: AttachmentStorageAdapter) {
    this.attachmentRepo = attachmentsRepo;
    this.storageAdapter = storageAdapter;
  }

  /**
   * Creates a new attachment
   * 
   * @param dayId Day ID
   * @returns Created attachment
   * @async
   */
  public async create(dayId: Day['id'], file: Express.Multer.File): Promise<Attachment> {
    const extension = file.originalname.substring(file.originalname.lastIndexOf('.') + 1).toLowerCase();
    const filename = `${file.filename}.${extension}`;
    await this.storageAdapter.store(createReadStream(file.path), filename, {
      mimetype: file.mimetype
    });
    const attachment = this.attachmentRepo.create({
      filename,
      mimetype: file.mimetype,
      dayId
    });
    await this.attachmentRepo.save(attachment);
    return attachment;
  }

  /**
   * Finds one attachment
   * 
   * @param id Attachment ID
   * @returns Attachment
   */
  public async findOne(id: Attachment['id']): Promise<Attachment> {
    return this.attachmentRepo.findOne({ id });
  }

  /**
   * Updates an attachment
   * 
   * @param id Attachment ID
   * @param dto DTO
   * @async
   */
  public async update(id: Attachment['id'], dto: UpdateAttachmentDto): Promise<void> {
    await this.attachmentRepo.update({ id }, dto);
  }

  /**
   * Checks if attachment(s) exists
   * 
   * @param ids Attachment IDs
   * @returns True if the attachment(s) exists, false otherwise
   * @async
   */
   public async exists(...ids: Day['id'][]): Promise<boolean> {
    return await this.attachmentRepo.exists(...ids);
  }

  /**
   * Downloads an attachment
   * 
   * @param id Attachment ID
   * @returns Downloaded attachment stream
   */
  public async download(id: Attachment['id']): Promise<Readable> {
    const attachment = await this.findOne(id);
    return this.storageAdapter.get(attachment.filename);
  }
}
