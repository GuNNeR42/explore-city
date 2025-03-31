import {BriefReturnSiteDto} from "../../sites/Dtos/BriefReturnSiteDto";

export class DetailedReturnCityDto {
    id: number;
    name: string;
    country: string;
    imageUrl: string;
    sites: BriefReturnSiteDto[];
}