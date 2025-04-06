import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from "@nestjs/common";
import {PlacesService} from "./places.service";
import {PlaceType} from "./Entities/place_type.enum";
import {DetailedReturnPlaceDto} from "./Dtos/DetailedReturnPlaceDto";
import {CreateUpdatePlaceDto} from "./Dtos/CreateUpdatePlaceDto";

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
    @HttpCode(HttpStatus.CREATED)
    createNewPlaceForCity(@Param('cityId') cityId: number, @Body() dto: CreateUpdatePlaceDto): Promise<number>
    {
        return this.placesService.createPlace(cityId, dto);
    }

    @Put('places/:placeId')
    @HttpCode(HttpStatus.NO_CONTENT)
    updatePlace(@Param('placeId') placeId: number, @Body() dto: CreateUpdatePlaceDto): Promise<void>
    {
        return this.placesService.updatePlace(placeId, dto);
    }

    @Delete('places/:placeId')
    @HttpCode(HttpStatus.NO_CONTENT)
    deletePlace(@Param('placeId') placeId: number): Promise<void> {
        return this.placesService.deletePlace(placeId);
    }
}