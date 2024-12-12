import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';

describe('VehiclesResolver', () => {
  let resolver: VehiclesResolver;
  let service: VehiclesService;

  const mockVehiclesService = {
    getAllVehicles: jest.fn(),
    getFilmById: jest.fn(),
    analyzeOpeningCrawl: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesResolver,
        { provide: VehiclesService, useValue: mockVehiclesService },
      ],
    }).compile();

    resolver = module.get<VehiclesResolver>(VehiclesResolver);
    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});