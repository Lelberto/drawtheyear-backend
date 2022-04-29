import { Test, TestingModule } from '@nestjs/testing';
import { DayByUserController } from './day-by-user.controller';

describe('DayByUserController', () => {
  let controller: DayByUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayByUserController],
    }).compile();

    controller = module.get<DayByUserController>(DayByUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
