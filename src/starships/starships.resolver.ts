import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { StarshipsService } from './starships.service';
import { StarshipType } from './starship.type';

@Resolver(() => StarshipType)
export class StarshipsResolver {
    constructor(private readonly starshipsService: StarshipsService) { }

    @Query(() => [StarshipType], { name: 'starships' })
    async getAllStarships(
        @Args('page', { type: () => Int, nullable: true }) page?: number,
        @Args('filter', { type: () => String, nullable: true }) filter?: string,
    ): Promise<StarshipType[]> {
        return this.starshipsService.getAllStarships(page, filter);
    }

    @Query(() => StarshipType, { name: 'starship' })
    async getStarshipById(@Args('id', { type: () => Int }) id: number): Promise<StarshipType> {
        return this.starshipsService.getStarshipById(id);
    }
}
