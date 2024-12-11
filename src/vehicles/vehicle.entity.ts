import { Entity, Column } from 'typeorm';

@Entity('vehicles')
export class Vehicles {
    @Column('text')
    name: string;

    @Column('text')
    model: string;

    @Column('text')
    manufacter: string;

    @Column('int')
    cost_in_credit: number;

    @Column('int')
    lenght: number;

    @Column('int')
    max_atmosphering_speed: number;

    @Column('int')
    crew: number;
    
    @Column('int')
    passengers: number;
    
    @Column('int')
    cargo_capacity: number;
    
    @Column('text')
    consumables: string;

    @Column('text')
    vehicle_class: string;
}
