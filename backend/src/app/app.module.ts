import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CitiesModule} from "../cities/cities.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {City} from "../cities/city.entity";
import {CommentsModule} from "../comments/comments.module";
import {Comment} from "../comments/comment.entity";
import {RatingsModule} from "../ratings/ratings.module";
import {Rating} from "../ratings/rating.entity";
import {Place} from "../places/Entities/place.entity";
import {PlacesModule} from "../places/places.module";

@Module({
  imports: [
      ConfigModule.forRoot(),
      CitiesModule,
      PlacesModule,
      CommentsModule,
      RatingsModule,
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'explore_mysql',
          port: 3306,
          username: 'root',
          password: 'password',
          database: 'explore_city_db',
          entities: [City, Place, Comment, Rating],
          synchronize: true,
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
