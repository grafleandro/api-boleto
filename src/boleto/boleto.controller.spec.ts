import { Test, TestingModule } from '@nestjs/testing';
import { BoletoController } from './boleto.controller';

describe('BoletoController', () => {
  let controller: BoletoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoletoController],
    }).compile();

    controller = module.get<BoletoController>(BoletoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
