import { Test, TestingModule } from '@nestjs/testing';
import { ThreeModelsService } from './three-models.service';

describe('ThreeModelsService', () => {
  let service: ThreeModelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreeModelsService],
    }).compile();

    service = module.get<ThreeModelsService>(ThreeModelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
