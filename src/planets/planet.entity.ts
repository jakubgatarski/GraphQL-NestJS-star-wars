import { Entity, Column } from 'typeorm';

@Entity('planets')
export class Planet {
    @Column('text')
    name: string;

    @Column('int')
    rotation_period: number;

    @Column('int')
    orbital_period: number;

    @Column('int')
    diameter: number;

    @Column('text')
    climate: string;

    @Column('text')
    gravity: string;

    @Column('text')
    terrain: string;

    @Column('text')
    surface_water: string;

    @Column('int')
    population: number;
}
