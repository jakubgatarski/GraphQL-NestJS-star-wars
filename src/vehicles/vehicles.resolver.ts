import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { VehiclesService } from './vehicles.service';
import { VehicleType } from './vehicle.type';

@Resolver(() => VehicleType)
export class VehiclesResolver {
    constructor(private readonly vehiclesService: VehiclesService) { }

    @Query(() => [VehicleType], { name: 'vehicles' })
    async getAllVehicles(
        @Args('page', { type: () => Int, nullable: true }) page?: number,
        @Args('filter', { type: () => String, nullable: true }) filter?: string,
    ): Promise<VehicleType[]> {
        return this.vehiclesService.getAllVehicles(page, filter);
    }

    @Query(() => VehicleType, { name: 'vehicle' })
    async getVehicleById(@Args('id', { type: () => Int }) id: number): Promise<VehicleType> {
        return this.vehiclesService.getVehicleById(id);
    }
}
