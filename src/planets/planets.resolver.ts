import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PlanetsService } from './planets.service';
import { PlanetType } from './planet.type';

@Resolver(() => PlanetType)
export class PlanetsResolver {
    constructor(private readonly planetsService: PlanetsService) { }

    @Query(() => [PlanetType], { name: 'planets' })
    async getAllPlanets(
        @Args('page', { type: () => Int, nullable: true }) page?: number,
        @Args('filter', { type: () => String, nullable: true }) filter?: string,
    ): Promise<PlanetType[]> {
        return this.planetsService.getAllPlanets(page, filter);
    }

    @Query(() => PlanetType, { name: 'planet' })
    async getPlanetById(@Args('id', { type: () => Int }) id: number): Promise<PlanetType> {
        return this.planetsService.getPlanetById(id);
    }
}
