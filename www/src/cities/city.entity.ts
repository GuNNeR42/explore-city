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

    @OneToMany(type => Site, site => site.city)
    sites: Site[];
}