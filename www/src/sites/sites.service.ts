import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Site} from "./Entities/site.entity";
import {Repository} from "typeorm";
import {City} from "../cities/city.entity";
import {BriefReturnSiteDto} from "./Dtos/BriefReturnSiteDto";
import {SiteType} from "./Entities/site_type.enum";

@Injectable()
export class SitesService  {
    constructor(
        @InjectRepository(Site)
        private sitesRepository: Repository<Site>,

        @InjectRepository(City)
        private cityRepository: Repository<City>,
    ) {}

    async getSitesByCity(cityId: number): Promise<BriefReturnSiteDto[]> {
        const city = await this.cityRepository.findOneBy({ id: Number(cityId) });

        if (!city) {
            throw new NotFoundException(`City with id ${cityId} not found`);
        }

        const sites =  await this.sitesRepository.find({
            where: {
                city: city
            },
            order: {
                name: 'ASC'
            }
        });

        return sites.map(s => ({
            id: s.id,
            name: s.name,
            type: SiteType[s.type]
        }));
    }
}