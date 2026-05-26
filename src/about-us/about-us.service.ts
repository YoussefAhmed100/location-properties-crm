import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { About, AboutDocument } from './schema/about.schema';

import { CreateAboutDto } from './dto/create-about-us.dto';
import { UpdateAboutDto } from './dto/update-about-us.dto';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectModel(About.name)
    private readonly aboutModel: Model<AboutDocument>,
  ) {}

  async create(createAboutDto: CreateAboutDto) {
    const exists = await this.aboutModel.exists({});

    if (exists) {
      throw new BadRequestException('About page already exists');
    }

    const about = await this.aboutModel.create(createAboutDto);

    return about;
  }

  async findOne() {
    const about = await this.aboutModel.findOne().lean();

    if (!about) {
      throw new NotFoundException('About page not found');
    }

    return about;
  }

  async update(updateAboutDto: UpdateAboutDto) {
    const exists = await this.aboutModel.exists({});

    if (!exists) {
      throw new NotFoundException('About page not found');
    }

    const updatedAbout = await this.aboutModel.findOneAndUpdate(
      {},
      updateAboutDto,
      {
        new: true,
        runValidators: true,
      },
    );

    return updatedAbout;
  }

  async remove() {
    const exists = await this.aboutModel.exists({});

    if (!exists) {
      throw new NotFoundException('About page not found');
    }

    await this.aboutModel.deleteOne({});

    return {
      message: 'About page deleted successfully',
    };
  }
}
