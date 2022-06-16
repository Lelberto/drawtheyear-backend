import { Test, TestingModule } from '@nestjs/testing';
import { EmotionRepository } from './entities/emotion.repository';
import { EmotionService } from './emotion.service';

describe('EmotionService', () => {
  let service: EmotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmotionService, EmotionRepository],
    }).compile();

    service = module.get<EmotionService>(EmotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
