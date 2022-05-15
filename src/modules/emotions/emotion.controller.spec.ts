import { Test, TestingModule } from '@nestjs/testing';
import { EmotionController } from './emotion.controller';
import { EmotionRepository } from './emotion.repository';
import { EmotionService } from './emotion.service';

describe('EmotionController', () => {
  let controller: EmotionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmotionController],
      providers: [EmotionService, EmotionRepository]
    }).compile();

    controller = module.get<EmotionController>(EmotionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
