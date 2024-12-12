import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsService } from './planets.service';
import { PlanetsResolver } from './planets.resolver';

describe('PlanetsService', () => {
  let resolver: PlanetsResolver;
  let service: PlanetsService;

  const mockPlanetsService = {
    getAllPlanets: jest.fn(),
    getFilmById: jest.fn(),
    analyzeOpeningCrawl: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsResolver,
        { provide: PlanetsService, useValue: mockPlanetsService },
      ],
    }).compile();

    resolver = module.get<PlanetsResolver>(PlanetsResolver);
    service = module.get<PlanetsService>(PlanetsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
