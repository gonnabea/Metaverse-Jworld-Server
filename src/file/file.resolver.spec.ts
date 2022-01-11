import { Test, TestingModule } from '@nestjs/testing';
import { FileResolver } from './file.resolver';

describe('FileResolver', () => {
  let resolver: FileResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileResolver],
    }).compile();

    resolver = module.get<FileResolver>(FileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
