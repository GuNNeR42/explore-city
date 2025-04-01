import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Rating} from "./rating.entity";
import {RatingsController} from "./ratings.controller";
import {RatingsService} from "./ratings.service";
import {Place} from "../places/Entities/place.entity";
import {PlacesModule} from "../places/places.module";

@Module({
    imports: [TypeOrmModule.forFeature([Rating, Place]), PlacesModule],
    controllers: [RatingsController],
    providers: [RatingsService],
})
export class RatingsModule {}