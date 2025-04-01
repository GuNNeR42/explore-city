import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Place} from "../places/Entities/place.entity";

@Entity('ratings')
export class Rating {
    constructor(place: Place, username: string, rating: number) {
        this.place = place;
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

    @ManyToOne(type => Place, place => place.ratings)
    place: Place;
}