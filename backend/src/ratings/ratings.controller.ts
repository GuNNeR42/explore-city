import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {RatingsService} from "./ratings.service";
import {CreateRatingDto} from "./Dtos/CreateRatingDto";

@Controller()
export class RatingsController {
    constructor(private readonly ratingsService: RatingsService) {}

    @Get('places/:placeId/ratings')
    getPlaceRatings(@Param('placeId') placeId: number) {
        return this.ratingsService.getRatings(placeId);
    }

    @Get('places/:placeId/ratings/avg')
    getPlaceAvgRatings(@Param('placeId') placeId: number) {
        return this.ratingsService.getRatingAvg(placeId);
    }

    @Post('places/:placeId/ratings')
    createNewRating(@Param('placeId') placeId: number, @Body() dto: CreateRatingDto) {
        return this.ratingsService.createRating(placeId, dto);
    }
}