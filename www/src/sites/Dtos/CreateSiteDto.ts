import {SiteType} from "../Entities/site_type.enum";

export class CreateSiteDto {
    name: string;
    description: string;
    address_line_1: string;
    address_line_2: string;
    site_type: SiteType;
}