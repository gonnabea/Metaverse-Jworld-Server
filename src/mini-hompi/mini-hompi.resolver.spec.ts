import { Test, TestingModule } from '@nestjs/testing';
import { MiniHompiResolver } from './mini-hompi.resolver';

describe('MiniHompiResolver', () => {
  let resolver: MiniHompiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniHompiResolver],
    }).compile();

    resolver = module.get<MiniHompiResolver>(MiniHompiResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
