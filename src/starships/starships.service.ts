import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_BASE_URL } from 'src/app.consts';
import { CacheService } from 'src/cache/cache.service';
import { BaseService } from 'src/common/base.service';
import { StarshipItem } from './starship.type';

@Injectable()
export class StarshipsService extends BaseService {
    private readonly endpoint = `${SWAPI_BASE_URL}/starships`;

    constructor(cacheService: CacheService) {
        super(cacheService);
    }

    async getAllStarships(page?: number, filter?: string): Promise<StarshipItem[]> {
        const data: StarshipItem[] = await this.fetchAndCache<StarshipItem[]>(this.endpoint, 'starships');
        const filteredData = this.applyFilter<StarshipItem>(data, filter);
        return this.applyPagination<StarshipItem>(filteredData, page);
    }

    async getStarshipById(id: number): Promise<StarshipItem> {
        const cacheKey = `starship:${id}`;
        const cachedStarship = await this.cacheService.get<StarshipItem>(cacheKey);

        if (cachedStarship) {
            console.log(`Cache hit for starship ID ${id}`);
            return cachedStarship;
        }

        console.log(`Cache miss for starship ID ${id}`);
        const response: StarshipItem = await this.fetchFromApiById<StarshipItem>(id);
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
