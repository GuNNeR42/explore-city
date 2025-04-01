import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {SiteType} from "./site_type.enum";
import {City} from "../../cities/city.entity";

@Entity('sites')
export class Site {
    constructor(city: City, name: string, description: string, address_line_1: string, address_line_2: string, site_type: SiteType) {
        this.city = city;
        this.name = name;
        this.description = description;
        this.address_line_1 = address_line_1;
        this.address_line_2 = address_line_2;
        this.type = site_type;
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    address_line_1: string;

    @Column()
    address_line_2: string;

    @Column({
        type: 'enum',
        enum: SiteType,
        nullable: true,
    })
    type: SiteType;

    @ManyToOne(type => City, city => city.sites)
    city: City;

    GetFullAddress(){
        return `${this.address_line_1} ${this.address_line_2}, ${this.city.name}, ${this.city.country}`;
    }
}