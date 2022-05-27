import { copyFile, unlink } from 'fs/promises';
import { basename, join } from 'path';
import { StorageService, StoreOptions } from './storage.service';

/**
 * Local storage service
 * 
 * The storage is located in the machine.
 */
export class LocalStorageService extends StorageService {
  
  public async store(srcPath: string, options: StoreOptions = { deleteSrcPath: false }): Promise<string> {
    const { dest } = this.config.local;
    const destPath = join(
      dest,
      options.transform ? options.transform(basename(srcPath)) : basename(srcPath)
    );
    await copyFile(srcPath, destPath);
    if (options.deleteSrcPath) {
      await unlink(srcPath);
    }
    return destPath;
  }
}
