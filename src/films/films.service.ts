import { Injectable } from '@nestjs/common';
import { SWAPI_BASE_URL } from 'src/app.consts';
import { CacheService } from 'src/cache/cache.service';
import { BaseService } from 'src/common/base.service';
import { FilmItem } from './film.type';

/**
 * Service for managing films data fetched from the SWAPI API.
 */
@Injectable()
export class FilmsService extends BaseService {
    private readonly endpoint = `${SWAPI_BASE_URL}/films`;

    /**
     * Constructor to inject dependencies.
     * @param cacheService - The caching service to handle caching of API responses.
     */
    constructor(cacheService: CacheService) {
        super(cacheService);
    }

    /**
     * Retrieves all films from the SWAPI API with optional pagination and filtering.
     * The entire list of films is cached under a single key.
     * @param page - (Optional) The page number for pagination.
     * @param filter - (Optional) A keyword to filter the films.
     * @returns A promise resolving to an array of film items.
     */
    async getAllFilms(page?: number, filter?: string): Promise<FilmItem[]> {
        const cacheKey = 'films';
        const data: FilmItem[] = await this.fetchAndCache<FilmItem[]>(this.endpoint, cacheKey);

        const filteredData = this.applyFilter<FilmItem>(data, filter);
        return this.applyPagination<FilmItem>(filteredData, page);
    }

    /**
     * Retrieves a single film by its ID.
     * @param id - The ID of the film to retrieve.
     * @returns A promise resolving to a film item.
     */
    async getFilmById(id: number): Promise<FilmItem> {
        const cacheKey = `film:${id}`;
        const cachedFilm = await this.cacheService.get<FilmItem>(cacheKey);

        if (cachedFilm) {
            console.log(`Cache hit for film ID ${id}`);
            return cachedFilm;
        }

        console.log(`Cache miss for film ID ${id}`);
        const response: FilmItem = await this.fetchFromApiById<FilmItem>(this.endpoint, id);
        await this.cacheService.set(cacheKey, response);
        return response;
    }

    /**
     * Analyzes the opening crawl text of all films to compute:
     * - Word frequency counts.
     * - The most mentioned character(s) in the opening crawls.
     * @returns A promise resolving to an object containing:
     *   - `wordCounts`: A record of unique words and their occurrences.
     *   - `mostMentionedCharacters`: An array of the most mentioned character names.
     */
    async analyzeOpeningCrawl(): Promise<{
        wordCounts: Record<string, number>;
        mostMentionedCharacters: string[];
    }> {
        const films = await this.fetchAndCache<FilmItem[]>(this.endpoint, 'films');

        const allText = films.map((film) => film.opening_crawl).join(' ');

        const words = allText
            .replace(/[\r\n]+/g, ' ')
            .split(/\s+/)
            .map((word) => word.toLowerCase().replace(/[^a-z0-9]/gi, ''))
            .filter((word) => word.length > 0);

        const wordCounts: Record<string, number> = {};
        for (const word of words) {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        }

        // Character mention analysis
        const charactersResponse = await this.fetchFromApi<any>(`${SWAPI_BASE_URL}/people`);
        const characters = charactersResponse.results.map((character: any) => character.name.toLowerCase());

        const characterMentions: Record<string, number> = {};
        for (const char of characters) {
            const charCount = (allText.match(new RegExp(`\\b${char}\\b`, 'gi')) || []).length;
            if (charCount > 0) {
                characterMentions[char] = charCount;
            }
        }

        const maxMentions = Math.max(...Object.values(characterMentions));
        const mostMentionedCharacters = Object.keys(characterMentions).filter(
            (char) => characterMentions[char] === maxMentions,
        );

        return {
            wordCounts,
            mostMentionedCharacters,
        };
    }
}