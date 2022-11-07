import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { join } from 'path';
import { Readable } from 'stream';
import attachmentConfig, { AttachmentConfig } from '../config/attachment.config';
import { StorageService } from '../storage/storage.service';
import { Attachment } from './entities/attachment.entity';

@Injectable()
export class AttachmentStorageAdapter {

  private readonly config: ConfigType<AttachmentConfig>;
  private readonly storageService: StorageService;

  public constructor(@Inject(attachmentConfig.KEY) config: ConfigType<AttachmentConfig>, storageService: StorageService) {
    this.config = config;
    this.storageService = storageService;
  }

  public async store(attachment: Attachment, data: Buffer): Promise<void> {
    await this.storageService.store(join(this.config.storage.root, attachment.path), data);
  }

  public async download(attachment: Attachment): Promise<Buffer> {
    return await this.storageService.download(join(this.config.storage.root, attachment.path));
  }

  public stream(attachment: Attachment): Readable {
    return this.storageService.stream(join(this.config.storage.root, attachment.path));
  }
}
