import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_BASE_URL } from 'src/app.consts';
import { CacheService } from 'src/cache/cache.service';
import { BaseService } from 'src/common/base.service';
import { Film } from './film.type';

@Injectable()
export class FilmsService extends BaseService {
  private readonly endpoint = `${SWAPI_BASE_URL}/films`;

  constructor(cacheService: CacheService) {
    super(cacheService);
  }

  async getAllFilms(page?: number, filter?: string): Promise<Film[]> {
    const data: Film[] = await this.fetchAndCache<Film[]>(this.endpoint, 'films');
    const filteredData = this.applyFilter<Film>(data, filter);
    return this.applyPagination<Film>(filteredData, page);
  }

  async getFilmById(id: number): Promise<Film> {
    const cacheKey = `film:${id}`;
    const cachedFilm = await this.cacheService.get<Film>(cacheKey);

    if (cachedFilm) {
      console.log(`Cache hit for film ID ${id}`);
      return cachedFilm;
    }

    console.log(`Cache miss for film ID ${id}`);
    const response: Film = await this.fetchFromApiById<Film>(id);
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
