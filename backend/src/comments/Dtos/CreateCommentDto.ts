import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    value: string;
}