import {Comment} from "./comment.entity";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommentsController} from "./comments.controller";
import {CommentsService} from "./comments.service";
import {Place} from "../places/Entities/place.entity";
import {PlacesModule} from "../places/places.module";

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Place]), PlacesModule],
    controllers: [CommentsController],
    providers: [CommentsService],
})
export class CommentsModule {}