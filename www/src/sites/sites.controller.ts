import {Controller, Get, NotFoundException, Param} from "@nestjs/common";
import {SitesService} from "./sites.service";
import {SiteType} from "./Entities/site_type.enum";
import {DetailedReturnSiteDto} from "./Dtos/DetailedReturnSiteDto";

@Controller()
export class SitesController {
    constructor(
        private sitesService: SitesService
    ) {}

    @Get('types')
    getSiteTypes(){
        return SiteType;
    }

    @Get('cities/:cityId/places')
    getSitesForCity(@Param('cityId') cityId: number) {
        return this.sitesService.getSitesByCity(cityId);
    }

    @Get('places/:placeId')
    getDetailedPlace(@Param('placeId') placeId: number): Promise<DetailedReturnSiteDto> {
        return this.sitesService.getSiteDetails(placeId);
    }
}