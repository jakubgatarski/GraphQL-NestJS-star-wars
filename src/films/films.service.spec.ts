import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { CacheService } from '../cache/cache.service';

describe('FilmsService', () => {
  let service: FilmsService;
  let cacheService: CacheService;

  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockFilmsData = [
    {
      title: 'A New Hope',
      episode_id: 4,
      opening_crawl: 'It is a period of civil war...',
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
      release_date: '1977-05-25',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        { provide: CacheService, useValue: mockCacheService },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    cacheService = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllFilms', () => {
    it('should return all films from the cache if available', async () => {
        const cacheKey = 'films';
        mockCacheService.get.mockResolvedValue(mockFilmsData); // Simulate cache hit

        const result = await service.getAllFilms();
        expect(result).toEqual(mockFilmsData);
        expect(mockCacheService.get).toHaveBeenCalledWith(cacheKey);
        expect(mockCacheService.set).not.toHaveBeenCalled();
    });

    it('should fetch films and cache them when cache is missed', async () => {
        const cacheKey = 'films';
        mockCacheService.get.mockResolvedValue(null); // Simulate cache miss
        jest.spyOn(service as any, 'fetchAndCache').mockResolvedValue(mockFilmsData);

        const result = await service.getAllFilms();
        expect(result).toEqual(mockFilmsData);
        expect(mockCacheService.get).toHaveBeenCalledWith(cacheKey);
        expect(mockCacheService.set).toHaveBeenCalledWith(cacheKey, mockFilmsData);
    });
});

  describe('getFilmById', () => {
    it('should return a film by ID', async () => {
      const mockFilm = mockFilmsData[0];
      mockCacheService.get.mockResolvedValue(mockFilm); // Simulate cache hit

      const result = await service.getFilmById(1);
      expect(result).toEqual(mockFilm);
      expect(mockCacheService.get).toHaveBeenCalledWith('film:1');
    });

    it('should fetch and cache film when cache is missed', async () => {
      mockCacheService.get.mockResolvedValue(null); // Simulate cache miss
      jest.spyOn(service as any, 'fetchFromApiById').mockResolvedValue(mockFilmsData[0]);

      const result = await service.getFilmById(1);
      expect(result).toEqual(mockFilmsData[0]);
      expect(mockCacheService.set).toHaveBeenCalledWith('film:1', mockFilmsData[0]);
    });
  });

  describe('analyzeOpeningCrawl', () => {
    it('should analyze the opening crawl text', async () => {
      jest.spyOn(service as any, 'fetchAndCache').mockResolvedValue(mockFilmsData);

      const result = await service.analyzeOpeningCrawl();
      expect(result.wordCounts).toHaveProperty('it');
      expect(result.mostMentionedCharacters).toEqual([]);
    });
  });
});
