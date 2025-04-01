import {BriefReturnPlaceDto} from "../../places/Dtos/BriefReturnPlaceDto";

export class DetailedReturnCityDto {
    id: number;
    name: string;
    country: string;
    imageUrl: string;
    places: BriefReturnPlaceDto[];
}