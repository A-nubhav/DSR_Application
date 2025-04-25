import { Test, TestingModule } from '@nestjs/testing';
import { DsrService } from './dsr.service';

describe('DsrService', () => {
  let service: DsrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DsrService],
    }).compile();

    service = module.get<DsrService>(DsrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
