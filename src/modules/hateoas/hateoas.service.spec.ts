import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { HateoasService } from './hateoas.service';

describe('HateoasService', () => {
  let service: HateoasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, HateoasService],
    }).compile();

    service = module.get<HateoasService>(HateoasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
