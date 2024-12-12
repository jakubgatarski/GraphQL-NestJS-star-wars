import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsResolver } from './starships.resolver';
import { StarshipsService } from './starships.service';

describe('StarshipsResolver', () => {
  let resolver: StarshipsResolver;
  let service: StarshipsService;

  const mockStarshipsService = {
    getAllStarships: jest.fn(),
    getFilmById: jest.fn(),
    analyzeOpeningCrawl: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarshipsResolver,
        { provide: StarshipsService, useValue: mockStarshipsService },
      ],
    }).compile();

    resolver = module.get<StarshipsResolver>(StarshipsResolver);
    service = module.get<StarshipsService>(StarshipsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});