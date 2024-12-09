import { Entity, Column } from 'typeorm';

@Entity('films')
export class Film {
    @Column()
    title: string;

    @Column()
    episode_id: number;

    @Column('text')
    opening_crawl: string;

    @Column('text')
    director: string;

    @Column('text')
    producer: string;

    @Column()
    release_date: string;
}
