import { Test, TestingModule } from '@nestjs/testing';
import { MiniHompiService } from './mini-hompi.service';

describe('MiniHompiService', () => {
  let service: MiniHompiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniHompiService],
    }).compile();

    service = module.get<MiniHompiService>(MiniHompiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
