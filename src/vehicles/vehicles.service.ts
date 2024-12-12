import { Injectable } from '@nestjs/common';
import { SWAPI_BASE_URL } from 'src/app.consts';
import { CacheService } from 'src/cache/cache.service';
import { BaseService } from 'src/common/base.service';
import { VehicleItem } from './vehicle.type';

/**
 * Service for managing vehicles data fetched from the SWAPI API.
 */
@Injectable()
export class VehiclesService extends BaseService {
    private readonly endpoint = `${SWAPI_BASE_URL}/vehicles`;

    /**
     * Constructor to inject dependencies.
     * @param cacheService - The caching service to handle caching of API responses.
     */
    constructor(cacheService: CacheService) {
        super(cacheService);
    }

    /**
     * Retrieves all vehicles from the SWAPI API with optional pagination and filtering.
     * The entire list of vehicles is cached under a single key.
     * @param page - (Optional) The page number for pagination.
     * @param filter - (Optional) A keyword to filter the vehicles.
     * @returns A promise resolving to an array of vehicle items.
     */
    async getAllVehicles(page?: number, filter?: string): Promise<VehicleItem[]> {
        const cacheKey = 'vehicles';
        const data: VehicleItem[] = await this.fetchAndCache<VehicleItem[]>(this.endpoint, cacheKey);

        const filteredData = this.applyFilter<VehicleItem>(data, filter);
        return this.applyPagination<VehicleItem>(filteredData, page);
    }

    /**
     * Retrieves a single vehicle by its ID.
     * @param id - The ID of the vehicle to retrieve.
     * @returns A promise resolving to a vehicle item.
     */
    async getVehicleById(id: number): Promise<VehicleItem> {
        const cacheKey = `vehicle:${id}`;
        const cachedVehicle = await this.cacheService.get<VehicleItem>(cacheKey);

        if (cachedVehicle) {
            console.log(`Cache hit for vehicle ID ${id}`);
            return cachedVehicle;
        }

        console.log(`Cache miss for vehicle ID ${id}`);
        const response: VehicleItem = await this.fetchFromApiById<VehicleItem>(this.endpoint, id);
        await this.cacheService.set(cacheKey, response);
        return response;
    }
}