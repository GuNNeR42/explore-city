import {Injectable, NotFoundException} from "@nestjs/common";
import {City} from "./city.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUpdateCityDto} from "./Dtos/CreateUpdateCityDto";
import {BriefReturnCityDto} from "./Dtos/BriefReturnCityDto";
import {DetailedReturnCityDto} from "./Dtos/DetailedReturnCityDto";
import {SiteType} from "../sites/Entities/site_type.enum";

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>,
    ) {}

    async getCities(): Promise<BriefReturnCityDto[]> {
        const cities = await this.cityRepository.find({ order: { name: 'ASC'}});
        return cities.map(c => ({
            id: c.id,
            name: c.name,
            imageUrl: c.imageUrl,
        }));
    }

    async getCityWithSites(id: number): Promise<DetailedReturnCityDto> {
        const city = await this.cityRepository.findOne({
            where:  {
                id: id,
            },
            relations: ['sites']
        });
        if (!city) {
            throw new NotFoundException("No City");
        }
        return {
            id: city.id,
            name: city.name,
            country: city.country,
            imageUrl: city.imageUrl,
            sites: city.sites.map(s => ({
                id: s.id,
                name: s.name,
                type: SiteType[s.type], // Assuming `type` exists in `site`
            })),
            // sites: city.sites,
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