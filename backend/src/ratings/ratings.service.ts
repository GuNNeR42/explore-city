import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Rating} from "./rating.entity";
import {Repository} from "typeorm";
import {CreateRatingDto} from "./Dtos/CreateRatingDto";
import {PlacesService} from "../places/places.service";

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(Rating)
        private readonly ratingRepository: Repository<Rating>,

        private readonly placesService : PlacesService
    ) {}

    async getRatings(placeId: number): Promise<Rating[]> {
        const place = await this.placesService.getPlace(placeId);

        return this.ratingRepository.find({
            where: {place: {id: place.id}},
            order: {created_at: 'DESC'}
        });
    }

    async getRatingAvg(placeId: number): Promise<number> {
        const place = await this.placesService.getPlace(placeId);

        return await this.ratingRepository.average('rating', {place: {id: place.id}}) ?? 0;
    }

    async createRating(placeId: number, dto: CreateRatingDto): Promise<number> {
        const place = await this.placesService.getPlace(placeId);

        const rating = await this.ratingRepository.save(
            new Rating(place, dto.username, dto.rating),
        );

        return rating.id;
    }
}