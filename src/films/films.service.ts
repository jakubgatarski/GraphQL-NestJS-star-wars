import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CACHE_TTL, DEFAULT_PAGE_SIZE, SWAPI_BASE_URL } from 'src/app.consts';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class FilmsService {
    constructor(private readonly cacheService: CacheService) { }

    async getAllFilms(page?: number, filter?: string): Promise<any[]> {
        const cacheKey = `films?page=${page || 1}&filter=${filter || ''}`;

        const cachedFilms = await this.cacheService.get<any[]>(cacheKey);
        if (cachedFilms) {
            console.log(`Cache hit for key: ${cacheKey}`);
            return cachedFilms;
        }

        console.log(`Cache miss for key: ${cacheKey}`);
        const response = await axios.get(SWAPI_BASE_URL + '/films');
        let films = response.data.results;

        if (filter) {
            films = films.filter((film) =>
                Object.values(film).some((value) =>
                    String(value).toLowerCase().includes(filter.toLowerCase()),
                ),
            );
        }

        const pageSize = DEFAULT_PAGE_SIZE;
        if (page) {
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            films = films.slice(startIndex, endIndex);
        }

        await this.cacheService.set(cacheKey, films, CACHE_TTL);
        return films;
    }

    async getFilmById(id: number): Promise<any> {
        const cacheKey = `film:${id}`;

        const cachedFilm = await this.cacheService.get<any>(cacheKey);
        if (cachedFilm) {
            console.log(`Cache hit for key: ${cacheKey}`);
            return cachedFilm;
        }

        console.log(`Cache miss for key: ${cacheKey}`);
        const response = await axios.get(SWAPI_BASE_URL + '/films/' + id);
        const film = response.data;

        await this.cacheService.set(cacheKey, film, CACHE_TTL);
        return film;
    }
}
