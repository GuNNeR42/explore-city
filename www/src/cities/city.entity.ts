import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Place} from "../places/Entities/place.entity";

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

    @OneToMany(type => Place, place => place.city)
    places: Place[];

    constructor(name: string, country: string) {
        this.name = name;
        this.country = country;
    }
}