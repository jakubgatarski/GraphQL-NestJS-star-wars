import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { SpeciesService } from './species.service';
import { SpeciesType } from './species.type';

@Resolver(() => SpeciesType)
export class SpeciesResolver {
    constructor(private readonly speciesService: SpeciesService) { }

    @Query(() => [SpeciesType], { name: 'species' })
    async getAllSpecies(
        @Args('page', { type: () => Int, nullable: true }) page?: number,
        @Args('filter', { type: () => String, nullable: true }) filter?: string,
    ): Promise<SpeciesType[]> {
        return this.speciesService.getAllSpecies(page, filter);
    }

    @Query(() => SpeciesType, { name: 'speciesById' })
    async getSpeciesById(@Args('id', { type: () => Int }) id: number): Promise<SpeciesType> {
        return this.speciesService.getSpeciesById(id);
    }
}
