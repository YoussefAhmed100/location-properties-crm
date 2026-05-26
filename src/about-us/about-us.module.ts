import { Module } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AboutUsController } from './about-us.controller';
import { About, AboutSchema } from './schema/about.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
    MongooseModule.forFeature([
      {
        name: About.name,
        schema: AboutSchema,
      },
    ]),
  ],
  controllers: [AboutUsController],
  providers: [AboutUsService],
})
export class AboutUsModule {}
