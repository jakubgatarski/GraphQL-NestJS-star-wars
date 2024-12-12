import { Injectable } from '@nestjs/common';
import { SWAPI_BASE_URL } from 'src/app.consts';
import { CacheService } from 'src/cache/cache.service';
import { BaseService } from 'src/common/base.service';
import { PlanetItem } from './planet.type';

/**
 * Service for managing planets data fetched from the SWAPI API.
 */
@Injectable()
export class PlanetsService extends BaseService {
    private readonly endpoint = `${SWAPI_BASE_URL}/planets`;

    /**
     * Constructor to inject dependencies.
     * @param cacheService - The caching service to handle caching of API responses.
     */
    constructor(cacheService: CacheService) {
        super(cacheService);
    }

    /**
     * Retrieves all planets from the SWAPI API with optional pagination and filtering.
     * The entire list of planets is cached under a single key.
     * @param page - (Optional) The page number for pagination.
     * @param filter - (Optional) A keyword to filter the planets.
     * @returns A promise resolving to an array of planet items.
     */
    async getAllPlanets(page?: number, filter?: string): Promise<PlanetItem[]> {
        const cacheKey = 'planets';
        const data: PlanetItem[] = await this.fetchAndCache<PlanetItem[]>(this.endpoint, cacheKey);
        const filteredData = this.applyFilter<PlanetItem>(data, filter);
        return this.applyPagination<PlanetItem>(filteredData, page);
    }

    /**
     * Retrieves a single planet by its ID.
     * @param id - The ID of the planet to retrieve.
     * @returns A promise resolving to a planet item.
     */
    async getPlanetById(id: number): Promise<PlanetItem> {
        const cacheKey = `planet:${id}`;
        const cachedPlanet = await this.cacheService.get<PlanetItem>(cacheKey);

        if (cachedPlanet) {
            console.log(`Cache hit for planet ID ${id}`);
            return cachedPlanet;
        }

        console.log(`Cache miss for planet ID ${id}`);
        const response: PlanetItem = await this.fetchFromApiById<PlanetItem>(this.endpoint, id);
        await this.cacheService.set(cacheKey, response);
        return response;
    }
}
