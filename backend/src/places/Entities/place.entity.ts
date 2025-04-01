import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PlaceType} from "./place_type.enum";
import {City} from "../../cities/city.entity";
import {Comment} from "../../comments/comment.entity";
import {Rating} from "../../ratings/rating.entity";

@Entity('places')
export class Place {
    constructor(city: City, name: string, description: string, address_line_1: string, address_line_2: string, place_type: PlaceType) {
        this.city = city;
        this.name = name;
        this.description = description;
        this.address_line_1 = address_line_1;
        this.address_line_2 = address_line_2;
        this.type = place_type;
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
        enum: PlaceType,
        nullable: true,
    })
    type: PlaceType;

    @ManyToOne(type => City, city => city.places)
    city: City;

    @OneToMany(type => Comment, comment => comment.place)
    comments: Comment[];

    @OneToMany(type => Rating, rating => rating.place)
    ratings: Rating[];

    GetFullAddress(){
        return `${this.address_line_1} ${this.address_line_2}, ${this.city.name}, ${this.city.country}`;
    }
}