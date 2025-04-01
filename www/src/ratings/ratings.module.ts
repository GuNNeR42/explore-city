import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Rating} from "./rating.entity";
import {RatingsController} from "./ratings.controller";
import {RatingsService} from "./ratings.service";
import {Site} from "../sites/Entities/site.entity";
import {SitesModule} from "../sites/sites.module";

@Module({
    imports: [TypeOrmModule.forFeature([Rating, Site]), SitesModule],
    controllers: [RatingsController],
    providers: [RatingsService],
})
export class RatingsModule {}