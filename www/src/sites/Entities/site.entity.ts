import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {SiteType} from "./site_type.enum";
import {City} from "../../cities/city.entity";

@Entity('sites')
export class Site {
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