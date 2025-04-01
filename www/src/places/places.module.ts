import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PlacesController} from "./places.controller";
import {PlacesService} from "./places.service";
import {City} from "../cities/city.entity";
import {Place} from "./Entities/place.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Place, City])],
    controllers: [PlacesController],
    providers: [PlacesService],
    exports: [PlacesService],
})
export class PlacesModule {}