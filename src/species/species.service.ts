import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_BASE_URL } from 'src/app.consts';
import { CacheService } from 'src/cache/cache.service';
import { BaseService } from 'src/common/base.service';
import { SpeciesItem } from './species.type';

@Injectable()
export class SpeciesService extends BaseService {
    private readonly endpoint = `${SWAPI_BASE_URL}/species`;

    constructor(cacheService: CacheService) {
        super(cacheService);
    }

    async getAllSpecies(page?: number, filter?: string): Promise<SpeciesItem[]> {
        const data: SpeciesItem[] = await this.fetchAndCache<SpeciesItem[]>(this.endpoint, 'species');
        const filteredData = this.applyFilter<SpeciesItem>(data, filter);
        return this.applyPagination<SpeciesItem>(filteredData, page);
    }

    async getSpeciesById(id: number): Promise<SpeciesItem> {
        const cacheKey = `species:${id}`;
        const cachedSpecies = await this.cacheService.get<SpeciesItem>(cacheKey);

        if (cachedSpecies) {
            console.log(`Cache hit for species ID ${id}`);
            return cachedSpecies;
        }

        console.log(`Cache miss for species ID ${id}`);
        const response: SpeciesItem = await this.fetchFromApiById<SpeciesItem>(id);
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
