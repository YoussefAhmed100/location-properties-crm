import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { About, AboutDocument } from 'src/about-us/schema/about.schema';

import { HomeMapper } from './mapper/home.mapper';

@Injectable()
export class HomeService {
  constructor(
    @InjectModel(About.name)
    private readonly aboutModel: Model<AboutDocument>,
  ) {}

  async getHomePageData() {
    const about = await this.aboutModel.findOne().lean();

    if (!about) {
      throw new NotFoundException('About page not found');
    }

    return HomeMapper.toHomePageResponse(about);
  }
}
