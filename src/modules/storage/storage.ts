import { Readable } from 'stream';
import { StoreOptions } from './storage.service';

/**
 * Storage interface
 */
export interface Storage {

  /**
   * Stores a file
   * 
   * @param stream File stream to store
   * @param key Key (filename or path)
   * @param options Store options
   * @returns Destination path
   */
  store(stream: Readable, key: string, options?: StoreOptions): Promise<void>;

  /**
   * Gets a file
   * 
   * @param key Key (filename or path)
   */
  get(key: string): Readable;
}
