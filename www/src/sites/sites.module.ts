import {Module} from "@nestjs/common";
import {Site} from "./Entities/site.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SitesController} from "./sites.controller";
import {SitesService} from "./sites.service";
import {City} from "../cities/city.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Site, City])],
    controllers: [SitesController],
    providers: [SitesService],
    exports: [SitesService],
})
export class SitesModule {}