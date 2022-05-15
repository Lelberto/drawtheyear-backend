import { Test, TestingModule } from '@nestjs/testing';
import { DayByUserController } from './day-by-user.controller';
import { DayRepository } from './day.repository';
import { DayService } from './day.service';

describe('DayByUserController', () => {
  let controller: DayByUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayByUserController, DayRepository],
      providers: [DayRepository, DayService]
    }).compile();

    controller = module.get<DayByUserController>(DayByUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
