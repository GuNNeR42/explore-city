import {Body, Controller, Get, NotFoundException, Param, Post} from "@nestjs/common";
import {SitesService} from "./sites.service";
import {SiteType} from "./Entities/site_type.enum";
import {DetailedReturnSiteDto} from "./Dtos/DetailedReturnSiteDto";
import {CreateSiteDto} from "./Dtos/CreateSiteDto";

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

    @Post('cities/:cityId/places')
    createNewPlaceForCity(@Param('cityId') cityId: number, @Body() dto: CreateSiteDto): Promise<number>
    {
        return this.sitesService.createSite(cityId, dto);
    }
}