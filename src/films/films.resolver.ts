import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { FilmsService } from './films.service';
import { FilmType } from './film.type';

@Resolver(() => FilmType)
export class FilmsResolver {
    constructor(private readonly filmsService: FilmsService) { }

    @Query(() => [FilmType], { name: 'films' })
    async getAllFilms(
        @Args('page', { type: () => Int, nullable: true }) page?: number,
        @Args('filter', { type: () => String, nullable: true }) filter?: string,
    ): Promise<FilmType[]> {
        return this.filmsService.getAllFilms(page, filter);
    }

    @Query(() => FilmType, { name: 'film' })
    async getFilmById(@Args('id', { type: () => Int }) id: number): Promise<FilmType> {
        return this.filmsService.getFilmById(id);
    }
}
