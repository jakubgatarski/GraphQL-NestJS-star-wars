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