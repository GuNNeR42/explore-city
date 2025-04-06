import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Place} from "../places/Entities/place.entity";

@Entity('comments')
export class Comment {
    constructor(place: Place, username: string, value: string) {
        this.place = place;
        this.username = username;
        this.value = value;
        this.created_at = new Date();
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    value: string;

    @Column()
    created_at: Date;

    @ManyToOne(type => Place, place => place.comments, {
        onDelete: 'CASCADE',
    })
    place: Place;
}