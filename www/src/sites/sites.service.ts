import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Site} from "./Entities/site.entity";
import {Repository} from "typeorm";
import {City} from "../cities/city.entity";
import {BriefReturnSiteDto} from "./Dtos/BriefReturnSiteDto";
import {SiteType} from "./Entities/site_type.enum";
import {DetailedReturnSiteDto} from "./Dtos/DetailedReturnSiteDto";
import {CreateSiteDto} from "./Dtos/CreateSiteDto";

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

    async getSiteDetails(siteId: number): Promise<DetailedReturnSiteDto> {
        const site = await this.sitesRepository.findOne({
            where: {
                id: Number(siteId)
            },
            relations: ['city']
        });
        if (!site) {
            throw new NotFoundException(`Site with id ${siteId} not found`);
        }

        return {
            id: site.id,
            name: site.name,
            description: site.description,
            address_line_1: site.address_line_1,
            address_line_2: site.address_line_2,
            city: site.city.name,
            country: site.city.country,
            displayedAddress: site.GetFullAddress(),
            site_type: site.type,
            site_type_value: SiteType[site.type],
        }
    }

    async createSite(cityId: number, dto: CreateSiteDto): Promise<number> {
        const c = await this.cityRepository.findOneBy({ id: cityId });
        if (!c) {
            throw new NotFoundException(`City with id ${cityId} not found`);
        }
        const s = await this.sitesRepository.save(
            new Site(c, dto.name, dto.description, dto.address_line_1, dto.address_line_2, dto.site_type),
        )
        return s.id;
    }
}