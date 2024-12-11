import { Entity, Column } from 'typeorm';

@Entity('species')
export class Species {
    @Column('text')
    name: string;

    @Column('text')
    classification: string;

    @Column('text')
    designation: string;

    @Column('text')
    average_height: string;

    @Column('text')
    skin_colors: string;

    @Column('text')
    hair_colors: string;

    @Column('text')
    eye_colors: string;

    @Column('int')
    average_lifespan: number;

    @Column('text')
    homeworld: string;

    @Column('text')
    language: string;
}
