import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {CitiesService} from "./cities.service";
import {CreateUpdateCityDto} from "./Dtos/CreateUpdateCityDto";
import {BriefReturnCityDto} from "./Dtos/BriefReturnCityDto";
import {DetailedReturnCityDto} from "./Dtos/DetailedReturnCityDto";

@Controller('cities')
export class CitiesController {
    constructor(
        private citiesService: CitiesService
    ) {
    }

    @Get()
    getCities(): Promise<BriefReturnCityDto[]> {
        return this.citiesService.getCities();
    }

    @Get(':id')
    getCity(@Param('id') id: number): Promise<DetailedReturnCityDto> {
        return this.citiesService.getCityWithSites(id);
    }

    @Post()
    createCity(@Body() data: CreateUpdateCityDto): Promise<number> {
        return this.citiesService.createCity(data);
    }

    @Put(':id')
    updateCity(
        @Param('id') id: number,
        @Body() data: CreateUpdateCityDto
    ): Promise<void> {
        return this.citiesService.updateCity(id, data);
    }

    @Delete(':id')
    deleteCity(@Param('id') id: number): Promise<void> {
        return this.citiesService.deleteCity(id);
    }
}