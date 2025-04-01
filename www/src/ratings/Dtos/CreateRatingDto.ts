import {ApiProperty} from "@nestjs/swagger";

export class CreateRatingDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    rating: number;
}