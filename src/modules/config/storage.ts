/** Storage configuration */

export type StorageConfig = {
  type: 'local' | 's3';
  local: {
    dest: string;
  };
  s3: {
    // TODO Implement S3 storage
  };
  allowedMineTypes: string[];
}

export default (): { storage: StorageConfig } => ({
  storage: {
    type: 'local',
    local: {
      dest: './data/storage',
    },
    s3: {},
    allowedMineTypes: [
      'image/jpeg', 'image/png', 'image/gif',
      'video/mp4', 'video/ogg', 'video/webm',
      'audio/aac', 'audio/mpeg', 'audio/ogg', 'audio/wav'
    ]
  }
});
