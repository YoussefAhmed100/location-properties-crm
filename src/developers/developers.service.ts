import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Developer } from './schema/developer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiFeatures } from 'src/common/utils/api-features';
import { buildQueryDto } from 'src/common/dto/base-query.dto';

@Injectable()
export class DevelopersService {
  constructor(  @InjectModel(Developer.name)
      private readonly developerModel: Model<Developer>) {}

  async create(createDeveloperDto: CreateDeveloperDto) {
    const existingDeveloper = await this.developerModel.findOne({
      email: createDeveloperDto.email,
    });

    if (existingDeveloper) {
      throw new ConflictException('Developer with this email already exists');
    }

    return this.developerModel.create(createDeveloperDto);
  }
//  @desc fined all developers
async findAll(query:buildQueryDto) {
  const features = new ApiFeatures(
    this.developerModel.find(),
    query,
  )
    .filter()
    .search(['email', 'name']);

  const total = await features.count();

  features.sort().limitFields().paginate(total);

  const data = await features.exec();

  return {
    results: data.length,
    pagination: features.paginationResult,
    data: data
  };
}

  findOne(id: string) {
    const developer = this.developerModel.findById( {_id: id,});
    if (!developer) {
      throw new BadRequestException('Developer not found');
    }
    return developer;
  }

  async update(id: string, updateDeveloperDto: UpdateDeveloperDto) {
     const developer = this.developerModel.findById({_id: id,});
    if (!developer) {
      throw new BadRequestException('Developer not found');

    }
    const email= await this.developerModel.findOne({ email: updateDeveloperDto.email });
    if (email) {
      throw new ConflictException('Developer with this email already exists');
    }
    return this.developerModel.findByIdAndUpdate(id, updateDeveloperDto, { new: true });

  }

  remove(id:string) {
    const developer = this.developerModel.findById({_id: id,});
    if (!developer) {
      throw new BadRequestException('Developer not found');
    }
    return this.developerModel.findByIdAndDelete(id);
  }
}
