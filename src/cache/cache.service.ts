import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from 'src/app.consts';

/**
 * Service for managing cache operations.
 * Provides methods to interact with the cache, including retrieving, setting,
 * deleting, and resetting cache data.
 */
@Injectable()
export class CacheService {
    /**
     * Constructor to inject the cache manager.
     * @param cacheManager - The cache manager instance provided by the `CACHE_MANAGER` token.
     */
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    /**
     * Retrieves a value from the cache.
     * @param key - The cache key to retrieve the value for.
     * @returns A promise resolving to the cached value, or `null` if the key does not exist.
     */
    async get<T>(key: string): Promise<T | null> {
        return this.cacheManager.get<T>(key);
    }

    /**
     * Sets a value in the cache.
     * @param key - The cache key to set the value for.
     * @param value - The value to store in the cache.
     * @param ttl - (Optional) The time-to-live (TTL) for the cached value, in seconds.
     * @returns A promise that resolves when the value has been set in the cache.
     */
    async set<T>(key: string, value: T, ttl?: number): Promise<void> {
        await this.cacheManager.set(key, value, ttl);
    }

    /**
     * Deletes a value from the cache.
     * @param key - The cache key to delete.
     * @returns A promise that resolves when the key has been deleted from the cache.
     */
    async del(key: string): Promise<void> {
        await this.cacheManager.del(key);
    }

    /**
     * Resets the entire cache, removing all cached keys and values.
     * @returns A promise that resolves when the cache has been reset.
     */
    async reset(): Promise<void> {
        await this.cacheManager.reset();
    }
}
