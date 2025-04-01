import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {Comment} from "./comment.entity";
import {CreateCommentDto} from "./Dtos/CreateCommentDto";
import {PlacesService} from "../places/places.service";

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,

        private readonly placesService: PlacesService
    ) {}

    async getPlaceComments(placeId: number) {
        const place = await this.placesService.getPlace(placeId);

        return this.commentRepository.find({
            where: {
                place: {
                    id: place.id
                }
            },
            order: {
                created_at: 'DESC'
            }
        });
    }

    async createComment(placeId: number, dto: CreateCommentDto): Promise<number> {
        const place = await this.placesService.getPlace(placeId);

        const comment = await this.commentRepository.save(
            new Comment(place, dto.username, dto.value),
        )

        return comment.id;
    }

}