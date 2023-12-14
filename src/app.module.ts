import { Module } from '@nestjs/common';
import { MongooseModule} from "@nestjs/mongoose";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ProductModule} from "./products/product.module";


@Module({
  imports: [ProductModule, MongooseModule.forRoot("mongodb+srv://upeksha:22058abcd@cluster0.14ytvct.mongodb.net/nest_crud")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
