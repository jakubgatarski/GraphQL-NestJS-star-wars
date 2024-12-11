import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_BASE_URL } from 'src/app.consts';
import { CacheService } from 'src/cache/cache.service';
import { BaseService } from 'src/common/base.service';
import { PlanetItem } from './planet.type';

@Injectable()
export class PlanetsService extends BaseService {
    private readonly endpoint = `${SWAPI_BASE_URL}/planets`;

    constructor(cacheService: CacheService) {
        super(cacheService);
    }

    async getAllPlanets(page?: number, filter?: string): Promise<PlanetItem[]> {
        const data: PlanetItem[] = await this.fetchAndCache<PlanetItem[]>(this.endpoint, 'planets');
        const filteredData = this.applyFilter<PlanetItem>(data, filter);
        return this.applyPagination<PlanetItem>(filteredData, page);
    }

    async getPlanetById(id: number): Promise<PlanetItem> {
        const cacheKey = `planet:${id}`;
        const cachedPlanet = await this.cacheService.get<PlanetItem>(cacheKey);

        if (cachedPlanet) {
            console.log(`Cache hit for planet ID ${id}`);
            return cachedPlanet;
        }

        console.log(`Cache miss for planet ID ${id}`);
        const response: PlanetItem = await this.fetchFromApiById<PlanetItem>(id);
        await this.cacheService.set(cacheKey, response);
        return response;
    }

    private async fetchFromApiById<T>(id: number): Promise<T> {
        const url = `${this.endpoint}/${id}`;
        return this.fetchFromApi<T>(url);
    }

    private async fetchFromApi<T>(url: string): Promise<T> {
        const response = await axios.get(url);
        return response.data;
    }
}
