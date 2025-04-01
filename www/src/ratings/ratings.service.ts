import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Rating} from "./rating.entity";
import {Repository} from "typeorm";
import {CreateRatingDto} from "./Dtos/CreateRatingDto";
import {SitesService} from "../sites/sites.service";

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(Rating)
        private readonly ratingRepository: Repository<Rating>,

        private readonly sitesService : SitesService
    ) {}

    async getRatings(placeId: number): Promise<Rating[]> {
        const site = await this.sitesService.getSite(placeId);

        return this.ratingRepository.find({
            where: {site: {id: site.id}},
            order: {created_at: 'DESC'}
        });
    }

    async getRatingAvg(placeId: number): Promise<number> {
        const site = await this.sitesService.getSite(placeId);

        return await this.ratingRepository.average('rating', {site: {id: site.id}}) ?? 0;
    }

    async createRating(placeId: number, dto: CreateRatingDto): Promise<number> {
        const site = await this.sitesService.getSite(placeId);

        const rating = await this.ratingRepository.save(
            new Rating(site, dto.username, dto.rating),
        );

        return rating.id;
    }
}