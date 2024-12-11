import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CacheService } from '../cache/cache.service';
import { DEFAULT_PAGE_SIZE } from 'src/app.consts';

@Injectable()
export class BaseService {
    protected cacheService: CacheService;

    constructor(cacheService: CacheService) {
        this.cacheService = cacheService;
    }

    async fetchAndCache<T>(endpoint: string, cacheKey: string): Promise<T> {
        const cachedData = await this.cacheService.get<T>(cacheKey);
        if (cachedData) {
            console.log(`Cache hit for key: ${cacheKey}`);
            return cachedData;
        }

        console.log(`Cache miss for key: ${cacheKey}`);
        const response = await axios.get(endpoint);
        const data: T = response.data.results;

        await this.cacheService.set(cacheKey, data);
        return data;
    }

    applyPagination<T>(data: T[], page?: number, pageSize = DEFAULT_PAGE_SIZE): T[] {
        if (!page) return data;
        const startIndex = (page - 1) * pageSize;
        return data.slice(startIndex, startIndex + pageSize);
    }

    applyFilter<T>(data: T[], filter?: string): T[] {
        if (!filter) return data;
        if (!Array.isArray(data)) {
            throw new Error('Data must be an array for filtering.');
        }
        return data.filter((item) =>
            Object.values(item).some((value) =>
                String(value).toLowerCase().includes(filter.toLowerCase()),
            ),
        );
    }
}
