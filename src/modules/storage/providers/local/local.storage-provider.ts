import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { createReadStream } from 'fs';
import { mkdir, readFile, stat, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { Readable } from 'stream';
import storageConfig, { StorageConfig } from '../../../config/storage.config';
import { StorageProvider } from '../storage-provider';

@Injectable()
export class LocalStorageProvider extends StorageProvider {

  private readonly config: ConfigType<StorageConfig>['local'];

  public constructor(@Inject(storageConfig.KEY) config: ConfigType<StorageConfig>) {
    super();
    this.config = config.local;
  }

  public async store(path: string, data: Buffer): Promise<void> {
    const fullPath = join(this.config.root, path);
    await this.createDirectoryIfNotExists(dirname(fullPath));
    await writeFile(fullPath, data);
  }

  public async download(path: string): Promise<Buffer> {
    return await readFile(join(this.config.root, path));
  }

  public stream(path: string): Readable {
    return createReadStream(join(this.config.root, path));
  }

  private async createDirectoryIfNotExists(dir: string): Promise<void> {
    try {
      await stat(dir);
    } catch (err) {
      await mkdir(dir, { recursive: true });
    }
  }
}
