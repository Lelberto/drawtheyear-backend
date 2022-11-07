import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { posix, sep } from 'path';
import { Readable } from 'typeorm/platform/PlatformTools';
import storageConfig, { StorageConfig } from '../../../config/storage.config';
import { StorageProvider } from '../storage-provider';

@Injectable()
export class S3StorageProvider extends StorageProvider {

  private readonly config: ConfigType<StorageConfig>['s3'];
  private readonly s3: S3;

  public constructor(@Inject(storageConfig.KEY) config: ConfigType<StorageConfig>) {
    super();
    this.config = config.s3;
    this.s3 = new S3({
      credentials: {
        accessKeyId: this.config.accessKey,
        secretAccessKey: this.config.secretKey
      }
    });
  }

  public async store(path: string, data: Buffer): Promise<void> {
    await this.s3.upload({
      Bucket: this.config.bucket,
      Key: this.toPosix(path),
      Body: data
    }).promise();
  }

  public async download(path: string): Promise<Buffer> {
    return (await this.s3.getObject({
      Bucket: this.config.bucket,
      Key: this.toPosix(path)
    }).promise()).Body as Buffer;
  }

  public stream(path: string): Readable {
    return this.s3.getObject({
      Bucket: this.config.bucket,
      Key: this.toPosix(path)
    }).createReadStream();
  }

  /**
   * Converts a path to posix format
   * 
   * @param path Path to convert
   * @returns Converted path to POSIX format
   */
   private toPosix(path: string): string {
    return path.split(sep).join(posix.sep);
  }
}
