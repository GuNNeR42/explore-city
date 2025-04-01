import {Comment} from "./comment.entity";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommentsController} from "./comments.controller";
import {CommentsService} from "./comments.service";
import {Site} from "../sites/Entities/site.entity";
import {SitesModule} from "../sites/sites.module";

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Site]), SitesModule],
    controllers: [CommentsController],
    providers: [CommentsService],
})
export class CommentsModule {}