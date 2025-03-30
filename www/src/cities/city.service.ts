import {Injectable} from "@nestjs/common";
import {City} from "./city.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUpdateCityDto} from "./Dtos/CreateUpdateCityDto";

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>,
    ) {}

    getCities(): Promise<City[]> {
        return this.cityRepository.find();
    }

    getCity(id: number): Promise<City> {
        return this.cityRepository.findOneByOrFail({ id:id });
    }

    async createCity(data: CreateUpdateCityDto): Promise<number> {
        let c = await this.cityRepository.save(
            new City(data.name, data.country)
        );
        return c.id;
    }

    async updateCity(id: number, data: CreateUpdateCityDto): Promise<void> {
         await this.cityRepository.update({id: id}, {name: data.name, country: data.country});
    }

    async deleteCity(id: number): Promise<void> {
        await this.cityRepository.delete({id: id});
    }
}