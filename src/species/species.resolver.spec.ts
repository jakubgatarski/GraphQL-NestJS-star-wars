import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesResolver } from './species.resolver';
import { SpeciesService } from './species.service';

describe('SpeciesResolver', () => {
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
