import { Test, TestingModule } from '@nestjs/testing';
import { SolarSystemService } from './solar-system.service';

describe('SolarSystemService', () => {
  let service: SolarSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolarSystemService],
    }).compile();

    service = module.get<SolarSystemService>(SolarSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
