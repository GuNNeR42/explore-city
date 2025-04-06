import {PlaceType} from "../Entities/place_type.enum";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUpdatePlaceDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    address_line_1: string;

    @ApiProperty()
    address_line_2: string;

    @ApiProperty()
    place_type: PlaceType;
}