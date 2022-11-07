import { Readable } from 'stream';

export abstract class StorageProvider {

  public abstract store(path: string, data: Buffer): void | Promise<void>;

  public abstract download(path: string): Buffer | Promise<Buffer>;

  public abstract stream(path: string): Readable;
}
