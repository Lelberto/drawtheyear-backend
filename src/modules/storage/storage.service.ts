import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { StorageProvider } from './providers/storage-provider';

@Injectable()
export class StorageService {

  private readonly storageProvider: StorageProvider;

  public constructor(storageProvider: StorageProvider) {
    this.storageProvider = storageProvider;
  }

  public async store(path: string, data: Buffer): Promise<void> {
    await this.storageProvider.store(path, data);
  }

  public async download(path: string): Promise<Buffer> {
    return await this.storageProvider.download(path);
  }

  public stream(path: string): Readable {
    return this.storageProvider.stream(path);
  }
}
