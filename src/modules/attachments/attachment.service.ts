import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import { EntityNotFoundException } from '../../global/exceptions/entity.exception';
import { Day } from '../days/entities/day.entity';
import { AttachmentStorageAdapter } from './attachment-storage.adapter';
import { UpdateAttachmentDto } from './entities/attachment.dto';
import { Attachment } from './entities/attachment.entity';
import { AttachmentRepository } from './entities/attachment.repository';

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
   * @param day Day
   * @returns Created attachment
   * @async
   */
  public async create(day: Day, file: Express.Multer.File): Promise<Attachment> {
    const extension = file.originalname.substring(file.originalname.lastIndexOf('.') + 1).toLowerCase();
    const filename = `${file.filename}.${extension}`;
    await this.storageAdapter.store(createReadStream(file.path), filename, {
      mimetype: file.mimetype
    });
    const attachment = this.attachmentRepo.create({
      filename,
      mimetype: file.mimetype,
      dayId: day.id
    });
    await this.attachmentRepo.save(attachment);
    return attachment;
  }

  /**
   * Finds one attachment
   * 
   * @param id Attachment ID
   * @throws EntityNotFoundException If the attachment is not found
   * @returns Attachment
   * @async
   */
  public async findOne(id: Attachment['id']): Promise<Attachment> {
    const attachment = await this.attachmentRepo.findOne({ id });
    if (!attachment) {
      throw new EntityNotFoundException(Attachment);
    }
    return attachment;
  }

  /**
   * Updates an attachment
   * 
   * @param attachment Attachment
   * @param dto DTO
   * @async
   */
  public async update(attachment: Attachment, dto: UpdateAttachmentDto): Promise<void> {
    await this.attachmentRepo.update({ id: attachment.id }, dto);
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
   * @param attachment Attachment
   * @returns Download attachment stream
   */
  public download(attachment: Attachment): Readable {
    return this.storageAdapter.get(attachment.filename);
  }
}
