import {Injectable, NotFoundException} from "@nestjs/common";
import {City} from "./city.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUpdateCityDto} from "./Dtos/CreateUpdateCityDto";
import {BriefReturnCityDto} from "./Dtos/BriefReturnCityDto";
import {DetailedReturnCityDto} from "./Dtos/DetailedReturnCityDto";
import {PlaceType} from "../places/Entities/place_type.enum";

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>,
    ) {}

    async getCities(start: number, count: number): Promise<BriefReturnCityDto[]> {
        const cities = await this.cityRepository.find({
            order: { name: 'ASC'},
            skip: start,
            take: count,
            });
        return cities.map(c => ({
            id: c.id,
            name: c.name,
            imageUrl: c.imageUrl,
        }));
    }

    async getRandomCities(count: number): Promise<BriefReturnCityDto[]> {
        const cities = await this.cityRepository
            .createQueryBuilder('city')
            .orderBy('RAND()')
            .limit(count)
            .getMany();

        return cities.map(c => ({
            id: c.id,
            name: c.name,
            imageUrl: c.imageUrl ?? null,
        }));
    }

    async getCityWithPlaces(id: number): Promise<DetailedReturnCityDto> {
        const city = await this.cityRepository.findOne({
            where:  {
                id: id,
            },
            relations: ['places']
        });
        if (!city) {
            throw new NotFoundException("No City");
        }
        return {
            id: city.id,
            name: city.name,
            country: city.country,
            imageUrl: city.imageUrl,
            places: city.places.map(s => ({
                id: s.id,
                name: s.name,
                type: PlaceType[s.type],
            })),
        };
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