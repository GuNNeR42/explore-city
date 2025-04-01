import {SiteType} from "../Entities/site_type.enum";
import {ApiProperty} from "@nestjs/swagger";

export class CreateSiteDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    address_line_1: string;

    @ApiProperty()
    address_line_2: string;

    @ApiProperty()
    site_type: SiteType;
}