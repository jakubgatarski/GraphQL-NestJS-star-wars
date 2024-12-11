import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SpeciesType {
    @Field()
    name: string;

    @Field()
    classification: string;

    @Field()
    designation: string;

    @Field()
    average_height: string;

    @Field()
    skin_colors: string;

    @Field()
    hair_colors: string;

    @Field()
    eye_colors: string;

    @Field()
    average_lifespan: number;

    @Field()
    homeworld: string;

    @Field()
    language: string;
}


export interface SpeciesItem {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    skin_colors: string;
    hair_colors: string;
    eye_colors: string;
    average_lifespan: number;
    homeworld: string;
    language: string;
}