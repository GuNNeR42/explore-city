import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {Comment} from "./comment.entity";
import {Site} from "../sites/Entities/site.entity";
import {CreateCommentDto} from "./Dtos/CreateCommentDto";
import {SitesService} from "../sites/sites.service";

@Injectable()
export class CommentsService {
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>;

    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,

        private readonly sitesService: SitesService
    ) {}

    async getPlaceComments(placeId: number) {
        const site = await this.sitesService.getSite(placeId);

        return this.commentRepository.find({
            where: {
                site: {
                    id: site.id
                }
            },
            order: {
                created_at: 'DESC'
            }
        });
    }

    async createComment(placeId: number, dto: CreateCommentDto): Promise<number> {
        const site = await this.sitesService.getSite(placeId);

        const comment = await this.commentRepository.save(
            new Comment(site, dto.username, dto.value),
        )

        return comment.id;
    }

}