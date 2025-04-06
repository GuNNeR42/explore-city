import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post} from "@nestjs/common";
import {CommentsService} from "./comments.service";
import {CreateCommentDto} from "./Dtos/CreateCommentDto";

@Controller()
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Get('places/:placeId/comments')
    getPlaceComments(@Param('placeId') placeId: number) {
        return this.commentsService.getPlaceComments(placeId);
    }

    @Post('places/:placeId/comments')
    createNewComment(@Param('placeId') placeId: number, @Body() dto: CreateCommentDto) {
        return this.commentsService.createComment(placeId, dto);
    }

    @Delete('comments/:commentId')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteComment(@Param('commentId') commentId: number): Promise<void> {
        return this.commentsService.deleteComment(commentId);
    }
}