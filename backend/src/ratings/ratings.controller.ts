import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post} from "@nestjs/common";
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
    createNewRating(@Param('placeId') placeId: number, @Body() dto: CreateRatingDto): Promise<number> {
        return this.ratingsService.createRating(placeId, dto);
    }

    @Delete('ratings/:ratingId')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteRating(@Param('ratingId') ratingId: number): Promise<void> {
        return this.ratingsService.deleteRating(ratingId);
    }
}