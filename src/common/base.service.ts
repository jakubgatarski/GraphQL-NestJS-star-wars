import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CacheService } from '../cache/cache.service';
import { DEFAULT_PAGE_SIZE } from 'src/app.consts';

/**
 * Base service providing shared utility methods for API fetching, caching,
 * pagination, and filtering.
 */
@Injectable()
export class BaseService {
    protected cacheService: CacheService;

    /**
     * Constructor to inject the caching service.
     * @param cacheService - The caching service to handle caching of API responses.
     */
    constructor(cacheService: CacheService) {
        this.cacheService = cacheService;
    }

    /**
     * Fetches data from an API endpoint and caches the results.
     * @param endpoint - The API endpoint to fetch data from.
     * @param cacheKey - The key to store the cached data under.
     * @returns A promise resolving to the fetched and cached data.
     */
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

    /**
     * Fetches a single resource from an API by its ID.
     * @param endpoint - The base API endpoint.
     * @param id - The ID of the resource to fetch.
     * @returns A promise resolving to the fetched resource.
     */
    async fetchFromApiById<T>(endpoint: string, id: number): Promise<T> {
        const url = `${endpoint}/${id}`;
        return this.fetchFromApi<T>(url);
    }

    /**
     * Fetches data from a specific API URL.
     * @param url - The API URL to fetch data from.
     * @returns A promise resolving to the fetched data.
     */
    async fetchFromApi<T>(url: string): Promise<T> {
        const response = await axios.get(url);
        return response.data;
    }

    /**
     * Applies pagination to an array of data.
     * @param data - The data to paginate.
     * @param page - The page number (1-based index).
     * @param pageSize - The number of items per page.
     * @returns A subset of the data corresponding to the requested page.
     */
    applyPagination<T>(data: T[], page?: number, pageSize = DEFAULT_PAGE_SIZE): T[] {
        if (!page) return data;
        const startIndex = (page - 1) * pageSize;
        return data.slice(startIndex, startIndex + pageSize);
    }

    /**
     * Applies filtering to an array of data based on a filter keyword.
     * @param data - The data to filter.
     * @param filter - The keyword to filter by.
     * @returns The filtered subset of the data.
     */
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
