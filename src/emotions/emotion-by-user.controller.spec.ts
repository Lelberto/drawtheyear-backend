import { Test, TestingModule } from '@nestjs/testing';
import { EmotionByUserController } from './emotion-by-user.controller';
import { EmotionRepository } from './emotion.repository';
import { EmotionService } from './emotion.service';

describe('EmotionByUserController', () => {
  let controller: EmotionByUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmotionByUserController],
      providers: [EmotionService, EmotionRepository]
    }).compile();

    controller = module.get<EmotionByUserController>(EmotionByUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
