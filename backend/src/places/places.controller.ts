import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {PlacesService} from "./places.service";
import {PlaceType} from "./Entities/place_type.enum";
import {DetailedReturnPlaceDto} from "./Dtos/DetailedReturnPlaceDto";
import {CreatePlaceDto} from "./Dtos/CreatePlaceDto";

@Controller()
export class PlacesController {
    constructor(
        private placesService: PlacesService
    ) {}

    @Get('types')
    getPlaceTypes(){
        return PlaceType;
    }

    @Get('cities/:cityId/places')
    getPlacesForCity(@Param('cityId') cityId: number) {
        return this.placesService.getPlacesByCity(cityId);
    }

    @Get('places/:placeId')
    getDetailedPlace(@Param('placeId') placeId: number): Promise<DetailedReturnPlaceDto> {
        return this.placesService.getPlaceDetails(placeId);
    }

    @Post('cities/:cityId/places')
    createNewPlaceForCity(@Param('cityId') cityId: number, @Body() dto: CreatePlaceDto): Promise<number>
    {
        return this.placesService.createPlace(cityId, dto);
    }
}