import { Test, TestingModule } from '@nestjs/testing';
import { SolarSystemController } from './solar-system.controller';

describe('SolarSystemController', () => {
  let controller: SolarSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolarSystemController],
    }).compile();

    controller = module.get<SolarSystemController>(SolarSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
