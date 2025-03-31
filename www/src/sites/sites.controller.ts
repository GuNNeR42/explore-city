import {Controller, Get, NotFoundException, Param} from "@nestjs/common";
import {SitesService} from "./sites.service";
import {SiteType} from "./Entities/site_type.enum";

@Controller('sites')
export class SitesController {
    constructor(
        private sitesService: SitesService
    ) {
    }

    @Get('types')
    getSiteTypes(){
        return SiteType;
    }

    @Get(':cityId')
    getSitesForCity(@Param('cityId') cityId: string) {
        const cityNum = Number(cityId);
        if (isNaN(cityNum)) {
            throw new NotFoundException("Invalid city number");
        }
        return this.sitesService.getSitesByCity(Number(cityId));
    }

}