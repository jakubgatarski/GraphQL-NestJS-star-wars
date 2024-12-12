import { Test, TestingModule } from '@nestjs/testing';
import { FilmsResolver } from './films.resolver';
import { FilmsService } from './films.service';

describe('FilmsResolver', () => {
  let resolver: FilmsResolver;
  let service: FilmsService;

  const mockFilmsService = {
    getAllFilms: jest.fn(),
    getFilmById: jest.fn(),
    analyzeOpeningCrawl: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsResolver,
        { provide: FilmsService, useValue: mockFilmsService },
      ],
    }).compile();

    resolver = module.get<FilmsResolver>(FilmsResolver);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});