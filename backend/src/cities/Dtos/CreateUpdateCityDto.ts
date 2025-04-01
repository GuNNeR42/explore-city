import {ApiProperty} from "@nestjs/swagger";

export class CreateUpdateCityDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    country: string;
}