import { StorageService, StoreOptions } from './storage.service';

/**
 * S3 storage service
 * 
 * This service uses Amazon S3 for storage.
 */
export class S3StorageService extends StorageService {

  public async store(srcPath: string, options?: StoreOptions): Promise<string> {
    return ''; // TODO Implement S3 storage
  }
}
