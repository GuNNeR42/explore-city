import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CitiesModule} from "../cities/cities.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {City} from "../cities/city.entity";
import {Site} from "../sites/Entities/site.entity";

@Module({
  imports: [
      ConfigModule.forRoot(),
      CitiesModule,
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'explore_mysql',
          port: 3306,
          username: 'root',
          password: 'password',
          database: 'explore_city_db',
          entities: [City, Site],
          synchronize: true,
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
