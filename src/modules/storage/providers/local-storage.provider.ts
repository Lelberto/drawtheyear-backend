import { createReadStream } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { Readable } from 'stream';
import { StorageProvider } from './storage.provider';

/**
 * Local storage service
 * 
 * The storage is located in the machine.
 */
export class LocalStorageService extends StorageProvider {
  
  public async store(stream: Readable, key: string): Promise<void> {
    await writeFile(join(this.config.local.dest, key), stream);
  }

  public get(key: string): Readable {
    return createReadStream(join(this.config.local.dest, key));
  }
}
