import { Entity, Column } from 'typeorm';

@Entity('films')
export class Film {
    @Column('text')
    title: string;

    @Column('int')
    episode_id: number;

    @Column('text')
    opening_crawl: string;

    @Column('text')
    director: string;

    @Column('text')
    producer: string;

    @Column('text')
    release_date: string;
}
