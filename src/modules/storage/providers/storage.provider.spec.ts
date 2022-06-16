import { Test, TestingModule } from '@nestjs/testing';
import { StorageProvider } from './storage.provider';

describe('StorageService', () => {
  let service: StorageProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageProvider],
    }).compile();

    service = module.get<StorageProvider>(StorageProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
