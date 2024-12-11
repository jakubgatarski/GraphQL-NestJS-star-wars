import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PlanetType {
    @Field()
    name: string;

    @Field()
    rotation_period: number;

    @Field()
    orbital_period: number;

    @Field()
    diameter: number;

    @Field()
    climate: string;

    @Field()
    gravity: string;

    @Field()
    terrain: string;

    @Field()
    surface_water: string;

    @Field()
    population: number;

}
export interface PlanetItem {
    name: string;
    rotation_period: number;
    orbital_period: number;
    diameter: number;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: number;
}