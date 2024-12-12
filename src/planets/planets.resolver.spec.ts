import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsResolver } from './planets.resolver';
import { PlanetsService } from './planets.service';

describe('PlanetsResolver', () => {
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
