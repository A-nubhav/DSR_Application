import { Test, TestingModule } from '@nestjs/testing';
import { DsrController } from './dsr.controller';

describe('DsrController', () => {
  let controller: DsrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DsrController],
    }).compile();

    controller = module.get<DsrController>(DsrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
