import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class VehicleType {
    @Field()
    name: string;

    @Field()
    model: string;

    @Field()
    manufacturer: string;

    @Field()
    cost_in_credits: number;

    @Field()
    length: number;

    @Field()
    max_atmosphering_speed: number;

    @Field()
    crew: number;

    @Field()
    passengers: number;

    @Field()
    cargo_capacity: number;

    @Field()
    consumables: string;

    @Field()
    vehicle_class: string;
}


export interface VehicleItem {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: number;
    length: number;
    max_atmosphering_speed: number;
    crew: number;
    passengers: number;
    cargo_capacity: number;
    consumables: string;
    vehicle_class: string;
}