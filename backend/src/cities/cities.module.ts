import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {City} from "./city.entity";
import {CitiesService} from "./cities.service";
import {CitiesController} from "./cities.controller";

@Module({
    imports: [TypeOrmModule.forFeature([City])],
    controllers: [CitiesController],
    providers: [CitiesService],
})
export class CitiesModule {}
