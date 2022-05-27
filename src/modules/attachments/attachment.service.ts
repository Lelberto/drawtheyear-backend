import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Day } from '../days/day.entity';
import { DayService } from '../days/day.service';
import { CreateAttachmentDto } from './attachment.dto';
import { Attachment } from './attachment.entity';
import { AttachmentRepository } from './attachment.repository';

/**
 * Attachment service
 */
@Injectable()
export class AttachmentService {

  private readonly attachmentRepo: AttachmentRepository;
  private readonly dayService: DayService;

  public constructor(attachmentsRepo: AttachmentRepository, dayService: DayService) {
    this.attachmentRepo = attachmentsRepo;
    this.dayService = dayService;
  }

  /**
   * Creates a new attachment
   * 
   * @param dayId Day ID
   * @param dto DTO
   * @returns Created attachment
   * @async
   */
  public async create(dayId: Day['id'], dto: CreateAttachmentDto, file: Express.Multer.File): Promise<Attachment> {
    const attachment = this.attachmentRepo.create({
      ...dto,
      path: file.path,
      mimetype: file.mimetype,
      extension: file.originalname.substring(file.originalname.lastIndexOf('.') + 1).toLowerCase(),
      day: await this.dayService.findOne(dayId)
    });
    await this.attachmentRepo.save(attachment);
    return attachment;
  }

  /**
   * Finds attachments
   * 
   * @param ids Day ID(s)
   * @returns Days
   * @async
   */
   public async find(...ids: Attachment['id'][]): Promise<Attachment[]> {
     if (ids.length > 0) {
      if (!await this.exists(...ids)) {
        throw new EntityNotFoundError(Day, ids);
      }
      return await this.attachmentRepo.findByIds(ids);
    }
    return await this.attachmentRepo.find();
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
   * Checks if attachment(s) exists
   * 
   * @param ids Attachment IDs
   * @returns True if the attachment(s) exists, false otherwise
   * @async
   */
   public async exists(...ids: Day['id'][]): Promise<boolean> {
    return await this.attachmentRepo.exists(...ids);
  }
}
