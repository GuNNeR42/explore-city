import {Injectable} from "@nestjs/common";
import {City} from "./city.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

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
}