import { Injectable } from '@nestjs/common';
import { SWAPI_BASE_URL } from 'src/app.consts';
import { CacheService } from 'src/cache/cache.service';
import { BaseService } from 'src/common/base.service';
import { SpeciesItem } from './species.type';

/**
 * Service for managing species data fetched from the SWAPI API.
 */
@Injectable()
export class SpeciesService extends BaseService {
    private readonly endpoint = `${SWAPI_BASE_URL}/species`;

    /**
     * Constructor to inject dependencies.
     * @param cacheService - The caching service to handle caching of API responses.
     */
    constructor(cacheService: CacheService) {
        super(cacheService);
    }

    /**
     * Retrieves all species from the SWAPI API with optional pagination and filtering.
     * The entire list of species is cached under a single key.
     * @param page - (Optional) The page number for pagination.
     * @param filter - (Optional) A keyword to filter the species.
     * @returns A promise resolving to an array of species items.
     */
    async getAllSpecies(page?: number, filter?: string): Promise<SpeciesItem[]> {
        const cacheKey = 'species';
        const data: SpeciesItem[] = await this.fetchAndCache<SpeciesItem[]>(this.endpoint, cacheKey);

        const filteredData = this.applyFilter<SpeciesItem>(data, filter);
        return this.applyPagination<SpeciesItem>(filteredData, page);
    }

    /**
     * Retrieves a single species by its ID.
     * @param id - The ID of the species to retrieve.
     * @returns A promise resolving to a species item.
     */
    async getSpeciesById(id: number): Promise<SpeciesItem> {
        const cacheKey = `species:${id}`;
        const cachedSpecies = await this.cacheService.get<SpeciesItem>(cacheKey);

        if (cachedSpecies) {
            console.log(`Cache hit for species ID ${id}`);
            return cachedSpecies;
        }

        console.log(`Cache miss for species ID ${id}`);
        const response: SpeciesItem = await this.fetchFromApiById<SpeciesItem>(this.endpoint, id);
        await this.cacheService.set(cacheKey, response);
        return response;
    }
}
