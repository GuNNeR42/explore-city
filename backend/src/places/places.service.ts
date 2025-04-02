import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {City} from "../cities/city.entity";
import {BriefReturnPlaceDto} from "./Dtos/BriefReturnPlaceDto";
import {PlaceType} from "./Entities/place_type.enum";
import {DetailedReturnPlaceDto} from "./Dtos/DetailedReturnPlaceDto";
import {CreatePlaceDto} from "./Dtos/CreatePlaceDto";
import {Place} from "./Entities/place.entity";

@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(Place)
        private placesRepository: Repository<Place>,

        @InjectRepository(City)
        private cityRepository: Repository<City>,
    ) {}

    async getPlacesByCity(cityId: number): Promise<BriefReturnPlaceDto[]> {
        const city = await this.cityRepository.findOneBy({ id: Number(cityId) });

        if (!city) {
            throw new NotFoundException(`City with id ${cityId} not found`);
        }

        const places =  await this.placesRepository.find({
            where: {
                city: city
            },
            order: {
                name: 'ASC'
            }
        });

        return places.map(s => ({
            id: s.id,
            name: s.name,
            type: PlaceType[s.type] ?? null
        }));
    }

    async getPlaceDetails(placeId: number): Promise<DetailedReturnPlaceDto> {
        const place = await this.placesRepository.findOne({
            where: {
                id: Number(placeId)
            },
            relations: ['city']
        });
        if (!place) {
            throw new NotFoundException(`Place with id ${placeId} not found`);
        }

        return {
            id: place.id,
            name: place.name,
            description: place.description,
            address_line_1: place.address_line_1,
            address_line_2: place.address_line_2,
            city: place.city.name,
            country: place.city.country,
            displayedAddress: place.GetFullAddress(),
            place_type: place.type,
            place_type_value: PlaceType[place.type],
        }
    }

    async createPlace(cityId: number, dto: CreatePlaceDto): Promise<number> {
        const c = await this.cityRepository.findOneBy({ id: cityId });
        if (!c) {
            throw new NotFoundException(`City with id ${cityId} not found`);
        }
        const s = await this.placesRepository.save(
            new Place(c, dto.name, dto.description, dto.address_line_1, dto.address_line_2, dto.place_type),
        )
        return s.id;
    }

    async getPlace(id: number): Promise<Place> {
        const place = await this.placesRepository.findOneBy({ id: id });
        if (!place) {
            throw new NotFoundException(`Place with id ${id} not found`);
        }
        return place;
    }
}