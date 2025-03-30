import {Controller, Get, Param, Post} from "@nestjs/common";
import {City} from "./city.entity";
import {CitiesService} from "./city.service";

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
}