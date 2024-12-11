import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_BASE_URL } from 'src/app.consts';
import { CacheService } from 'src/cache/cache.service';
import { BaseService } from 'src/common/base.service';
import { FilmItem } from './film.type';

@Injectable()
export class FilmsService extends BaseService {
    private readonly endpoint = `${SWAPI_BASE_URL}/films`;

    constructor(cacheService: CacheService) {
        super(cacheService);
    }

    async getAllFilms(page?: number, filter?: string): Promise<FilmItem[]> {
        const data: FilmItem[] = await this.fetchAndCache<FilmItem[]>(this.endpoint, 'films');
        const filteredData = this.applyFilter<FilmItem>(data, filter);
        return this.applyPagination<FilmItem>(filteredData, page);
    }

    async getFilmById(id: number): Promise<FilmItem> {
        const cacheKey = `film:${id}`;
        const cachedFilm = await this.cacheService.get<FilmItem>(cacheKey);

        if (cachedFilm) {
            console.log(`Cache hit for film ID ${id}`);
            return cachedFilm;
        }

        console.log(`Cache miss for film ID ${id}`);
        const response: FilmItem = await this.fetchFromApiById<FilmItem>(id);
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

    async analyzeOpeningCrawl(): Promise<{
        wordCounts: Record<string, number>;
        mostMentionedCharacters: string[];
    }> {
        const films = await this.fetchAndCache<any[]>(this.endpoint, 'films');

        const allText = films.map((film) => film.opening_crawl).join(' ');

        const words = allText
            .replace(/[\r\n]+/g, ' ')
            .split(/\s+/)
            .map((word) => word.toLowerCase().replace(/[^a-z0-9]/gi, ''))
            .filter((word) => word.length > 0);

        const wordCounts: Record<string, number> = {};
        for (const word of words) {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        }

        const charactersResponse = await axios.get(`${SWAPI_BASE_URL}/people`);
        const characters = charactersResponse.data.results.map((character) => character.name.toLowerCase());

        const characterMentions: Record<string, number> = {};
        for (const char of characters) {
            const charCount = (allText.match(new RegExp(`\\b${char}\\b`, 'gi')) || []).length;
            if (charCount > 0) {
                characterMentions[char] = charCount;
            }
        }

        const maxMentions = Math.max(...Object.values(characterMentions));
        const mostMentionedCharacters = Object.keys(characterMentions).filter(
            (char) => characterMentions[char] === maxMentions,
        );

        return {
            wordCounts,
            mostMentionedCharacters,
        };
    }
}
