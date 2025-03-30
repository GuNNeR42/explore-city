import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {City} from "./city.entity";
import {CitiesService} from "./city.service";
import {CreateUpdateCityDto} from "./Dtos/CreateUpdateCityDto";

@Controller('cities')
export class CitiesController {
    constructor(
        private citiesService: CitiesService
    ) {
    }

    @Get()
    getCities(): Promise<City[]> {
        return this.citiesService.getCities();
    }

    @Get(':id')
    getCity(@Param('id') id: number): Promise<City> {
        return this.citiesService.getCity(id);
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