import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { Readable } from 'stream';
import { Storage } from '../storage/storage';
import { StorageService, StoreOptions } from '../storage/storage.service';

/**
 * Attachment storage adapter
 * 
 * This adapter will add `attachments/` prefix to the key.
 */
@Injectable()
export class AttachmentStorageAdapter implements Storage {

  private readonly storageService: StorageService;

  public constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  public async store(stream: Readable, key: string, options?: StoreOptions): Promise<void> {
    await this.storageService.store(stream, join('attachments', key), options);
  }

  public get(key: string): Readable {
    return this.storageService.get(join('attachments', key));
  }
}
