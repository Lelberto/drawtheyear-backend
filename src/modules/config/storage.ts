/** Storage configuration */

export type StorageConfig = {
  type: 'local' | 's3';
  tmpDir: string;
  local: {
    dest: string;
  };
  s3: {
    accessKey: string;
    secretKey: string;
    bucket: string;
  };
  maxSize: number;
  allowedMineTypes: string[];
}

export default (): { storage: StorageConfig } => ({
  storage: {
    type: 'local',
    tmpDir: './data/storage/tmp',
    local: {
      dest: './data/storage',
    },
    s3: {
      accessKey: process.env.STORAGE_S3_ACCESS_KEY,
      secretKey: process.env.STORAGE_S3_SECRET_KEY,
      bucket: 'dtybucket',
    },
    maxSize: 5 * 10**6, // <Mo> * 10**6
    allowedMineTypes: [
      'image/jpeg', 'image/png', 'image/gif',
      'video/mp4', 'video/ogg', 'video/webm',
      'audio/mp3', 'audio/mp4', 'audio/aac', 'audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/m4a',
    ]
  }
});
