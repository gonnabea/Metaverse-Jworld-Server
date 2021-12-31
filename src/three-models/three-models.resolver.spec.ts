import { Test, TestingModule } from '@nestjs/testing';
import { ThreeModelsResolver } from './three-models.resolver';

describe('ThreeModelsResolver', () => {
  let resolver: ThreeModelsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreeModelsResolver],
    }).compile();

    resolver = module.get<ThreeModelsResolver>(ThreeModelsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
