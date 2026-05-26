import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { HomeController } from './home.controller';
import { HomeService } from './home.service';

import { About, AboutSchema } from '../about-us/schema/about.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: About.name,
        schema: AboutSchema,
      },
    ]),
  ],

  controllers: [HomeController],

  providers: [HomeService],
})
export class HomeModule {}
