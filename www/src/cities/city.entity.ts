import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Site} from "../sites/Entities/site.entity";

@Entity('cities')
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    country: string;

    @Column()
    imageUrl: string;

    @OneToMany(type => Site, site => site.city)
    sites: Site[];

    constructor(name: string, country: string) {
        this.name = name;
        this.country = country;
    }
}