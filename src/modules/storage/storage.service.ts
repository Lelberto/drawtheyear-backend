import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { lstat, readdir, rmdir, unlink } from 'fs/promises';
import { join } from 'path';
import { Readable } from 'stream';
import { StorageConfig } from '../config/storage';
import { Storage } from './storage';

/**
 * Storage service
 */
@Injectable()
export abstract class StorageService implements Storage {

  protected readonly config: StorageConfig;

  public constructor(configService: ConfigService) {
    this.config = configService.get('storage');
  }

  public abstract store(stream: Readable, key: string, options?: StoreOptions): Promise<void>;

  public abstract get(key: string): Readable;

  /**
   * Cleans the tmp directory
   * 
   * @async
   * @cron
   */
  @Cron('* 0 * * * *')
  public async cleanTmpDir(): Promise<void> {
    await this.cleanDir(this.config.tmpDir);
  }

  /**
   * Cleans a directory
   * 
   * @param dir Directory to clean
   * @param deleteAfterClean If true, the directory will be deleted after cleaning
   */
  private async cleanDir(dir: string, deleteAfterClean = false): Promise<void> {
    const files = await readdir(dir);
    for (const file of files) {
      const path = join(dir, file);
      if ((await lstat(path)).isDirectory()) {
        await this.cleanDir(path, true);
      } else {
        try {
          await unlink(path);
        } catch (err) {
          console.error('Could not delete file', path, err);
        }
      }
    }
    if (deleteAfterClean) {
      await rmdir(dir);
    }
  }
}

/**
 * Store options
 */
export type StoreOptions = {
  transform?: (key: string) => string;
  deleteSrcPath?: boolean;
  mimetype?: string;
}
