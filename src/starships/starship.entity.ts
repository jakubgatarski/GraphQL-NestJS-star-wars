import { Entity, Column } from 'typeorm';

@Entity('starships')
export class Starship {
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
    hyperdrive_rating: string;

    @Column('int')
    MGLT: number;

    @Column('text')
    starship_class: string;
}
