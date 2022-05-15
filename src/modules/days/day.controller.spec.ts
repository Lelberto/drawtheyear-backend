import { Test, TestingModule } from '@nestjs/testing';
import { EmotionService } from '../emotions/emotion.service';
import { DayController } from './day.controller';
import { DayRepository } from './day.repository';
import { DayService } from './day.service';

describe('DayController', () => {
  let controller: DayController;
  const mockDayService: jest.Mocked<Partial<DayService>> = {
    find: jest.fn(async () => Promise.resolve([]))
  };
  const mockEmotionService: jest.Mocked<Partial<EmotionService>> = {
    find: jest.fn(async (...ids: string[]) => Promise.resolve([]))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayController],
      providers: [
        DayRepository,
        {
          provide: DayService,
          useValue: mockDayService
        },
        {
          provide: EmotionService,
          useValue: mockEmotionService
        }
      ]
    }).compile();

    controller = module.get<DayController>(DayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET /days', async () => {
    expect(await controller.find()).toEqual([]);
  });
});
