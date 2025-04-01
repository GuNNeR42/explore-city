import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Site} from "../sites/Entities/site.entity";

@Entity('ratings')
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    rating: number;

    @ManyToOne(type => Site, site => site.ratings)
    site: Site;
}