/** Storage configuration */

export type StorageConfig = {
  type: 'local' | 's3';
  local: {
    dest: string;
  };
  s3: {
    // TODO Implement S3 storage
  };
  maxSize: number;
  allowedMineTypes: string[];
}

export default (): { storage: StorageConfig } => ({
  storage: {
    type: 'local',
    local: {
      dest: './data/storage',
    },
    s3: {},
    maxSize: 5 * 10**6, // <Mo> * 10**6
    allowedMineTypes: [
      'image/jpeg', 'image/png', 'image/gif',
      'video/mp4', 'video/ogg', 'video/webm',
      'audio/mp3', 'audio/mp4', 'audio/aac', 'audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/m4a',
    ]
  }
});
