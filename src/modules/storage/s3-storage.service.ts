import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { posix, sep } from 'path';
import { Readable } from 'stream';
import { StorageService, StoreOptions } from './storage.service';

/**
 * S3 storage service
 * 
 * This service uses Amazon S3 for storage.
 */
export class S3StorageService extends StorageService {

  private readonly s3: S3;

  public constructor(configService: ConfigService) {
    super(configService);
    const { accessKey, secretKey } = this.config.s3;
    this.s3 = new S3({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey
      }
    })
  }

  public async store(stream: Readable, key: string, options: StoreOptions = {}): Promise<void> {
    const res = await this.s3.upload({
      Bucket: this.config.s3.bucket,
      Key: this.toPosix(key),
      Body: stream,
      ContentType: options.mimetype || 'application/octet-stream',
      ContentDisposition: 'inline'
    }).promise();
    console.log(res);
  }

  public get(key: string): Readable {
    console.log(key, this.toPosix(key))
    return this.s3.getObject({
      Bucket: this.config.s3.bucket,
      Key: this.toPosix(key)
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
