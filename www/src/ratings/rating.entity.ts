import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Site} from "../sites/Entities/site.entity";

@Entity('ratings')
export class Rating {
    constructor(site: Site, username: string, rating: number) {
        this.site = site;
        this.username = username;
        this.rating = rating;
        this.created_at = new Date();
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    rating: number;

    @Column()
    created_at: Date;

    @ManyToOne(type => Site, site => site.ratings)
    site: Site;
}