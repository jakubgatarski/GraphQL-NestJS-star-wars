import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesService } from './species.service';
import { SpeciesResolver } from './species.resolver';

describe('SpeciesService', () => {
  let resolver: SpeciesResolver;
  let service: SpeciesService;

  const mockSpeciesService = {
    getAllSpecies: jest.fn(),
    getFilmById: jest.fn(),
    analyzeOpeningCrawl: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpeciesResolver,
        { provide: SpeciesService, useValue: mockSpeciesService },
      ],
    }).compile();

    resolver = module.get<SpeciesResolver>(SpeciesResolver);
    service = module.get<SpeciesService>(SpeciesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
