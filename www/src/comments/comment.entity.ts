import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Site} from "../sites/Entities/site.entity";

@Entity('comments')
export class Comment {
    constructor(place: Site, username: string, value: string) {
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

    @ManyToOne(type => Site, site => site.comments)
    site: Site;
}