import { Injectable } from '@nestjs/common';
import axios from 'axios';

const PAGE_SIZE = 3;

@Injectable()
export class FilmsService {
    private readonly SWAPI_URL = 'https://swapi.dev/api/films';

    async getAllFilms(page?: number, filter?: string): Promise<any[]> {
        const response = await axios.get(this.SWAPI_URL);
        let films = response.data.results;

        if (filter) {
            films = films.filter((film) =>
                Object.values(film).some((value) =>
                    String(value).toLowerCase().includes(filter.toLowerCase()),
                ),
            );
        }

        const pageSize = PAGE_SIZE;
        if (page) {
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            films = films.slice(startIndex, endIndex);
        }

        return films;
    }

    async getFilmById(id: number): Promise<any> {
        const response = await axios.get(`${this.SWAPI_URL}/${id}`);
        return response.data;
    }
}
