import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { Readable } from 'stream';
import { Storage } from '../storage/storage.interface';
import { StorageProvider, StoreOptions } from '../storage/providers/storage.provider';

/**
 * Attachment storage adapter
 * 
 * This adapter will add `attachments/` prefix to the key.
 */
@Injectable()
export class AttachmentStorageAdapter implements Storage {

  private readonly storageService: StorageProvider;

  public constructor(storageService: StorageProvider) {
    this.storageService = storageService;
  }

  public async store(stream: Readable, key: string, options?: StoreOptions): Promise<void> {
    await this.storageService.store(stream, join('attachments', key), options);
  }

  public get(key: string): Readable {
    return this.storageService.get(join('attachments', key));
  }
}
