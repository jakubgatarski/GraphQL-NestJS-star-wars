import { Injectable } from '@nestjs/common';
import { SWAPI_BASE_URL } from 'src/app.consts';
import { CacheService } from 'src/cache/cache.service';
import { BaseService } from 'src/common/base.service';
import { StarshipItem } from './starship.type';

/**
 * Service for managing starships data fetched from the SWAPI API.
 */
@Injectable()
export class StarshipsService extends BaseService {
    private readonly endpoint = `${SWAPI_BASE_URL}/starships`;

    /**
     * Constructor to inject dependencies.
     * @param cacheService - The caching service to handle caching of API responses.
     */
    constructor(cacheService: CacheService) {
        super(cacheService);
    }

    /**
     * Retrieves all starships from the SWAPI API with optional pagination and filtering.
     * The entire list of starships is cached under a single key.
     * @param page - (Optional) The page number for pagination.
     * @param filter - (Optional) A keyword to filter the starships.
     * @returns A promise resolving to an array of starship items.
     */
    async getAllStarships(page?: number, filter?: string): Promise<StarshipItem[]> {
        const cacheKey = 'starships';
        const data: StarshipItem[] = await this.fetchAndCache<StarshipItem[]>(this.endpoint, cacheKey);

        const filteredData = this.applyFilter<StarshipItem>(data, filter);
        return this.applyPagination<StarshipItem>(filteredData, page);
    }

    /**
     * Retrieves a single starship by its ID.
     * @param id - The ID of the starship to retrieve.
     * @returns A promise resolving to a starship item.
     */
    async getStarshipById(id: number): Promise<StarshipItem> {
        const cacheKey = `starship:${id}`;
        const cachedStarship = await this.cacheService.get<StarshipItem>(cacheKey);

        if (cachedStarship) {
            console.log(`Cache hit for starship ID ${id}`);
            return cachedStarship;
        }

        console.log(`Cache miss for starship ID ${id}`);
        const response: StarshipItem = await this.fetchFromApiById<StarshipItem>(this.endpoint, id);
        await this.cacheService.set(cacheKey, response);
        return response;
    }
}
