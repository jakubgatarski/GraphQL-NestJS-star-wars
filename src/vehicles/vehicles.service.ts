import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_BASE_URL } from 'src/app.consts';
import { CacheService } from 'src/cache/cache.service';
import { BaseService } from 'src/common/base.service';
import { VehicleItem } from './vehicle.type';

@Injectable()
export class VehiclesService extends BaseService {
    private readonly endpoint = `${SWAPI_BASE_URL}/vehicles`;

    constructor(cacheService: CacheService) {
        super(cacheService);
    }

    async getAllVehicles(page?: number, filter?: string): Promise<VehicleItem[]> {
        const data: VehicleItem[] = await this.fetchAndCache<VehicleItem[]>(this.endpoint, 'vehicles');
        const filteredData = this.applyFilter<VehicleItem>(data, filter);
        return this.applyPagination<VehicleItem>(filteredData, page);
    }

    async getVehicleById(id: number): Promise<VehicleItem> {
        const cacheKey = `vehicle:${id}`;
        const cachedVehicle = await this.cacheService.get<VehicleItem>(cacheKey);

        if (cachedVehicle) {
            console.log(`Cache hit for vehicle ID ${id}`);
            return cachedVehicle;
        }

        console.log(`Cache miss for vehicle ID ${id}`);
        const response: VehicleItem = await this.fetchFromApiById<VehicleItem>(id);
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
