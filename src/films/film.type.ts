import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FilmType {
    @Field()
    title: string;

    @Field()
    episode_id: number;

    @Field()
    opening_crawl: string;

    @Field()
    director: string;

    @Field()
    producer: string;

    @Field()
    release_date: string;

}

export interface FilmItem {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
  }