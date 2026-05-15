import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Unit, UnitDocument } from './schema/unit.schema';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { buildQueryDto } from 'src/common/dto/base-query.dto';
import { ApiFeatures } from 'src/common/utils/api-features';
import { UnitMapper } from './mapper/unit.mapper';
import objectHash from 'object-hash';

@Injectable()
export class WebsiteUnitsService {
  constructor(
    @InjectModel(Unit.name)
    private readonly unitModel: Model<UnitDocument>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: any,
  ) {}


  private basePublicQuery() {
    return this.unitModel
      .find({ showInWebsite: true })
      .populate('project', 'name -_id')
      .populate('area', 'name location -_id')
      .lean();
  }

 
  async findAll(query: buildQueryDto) {
    const cacheKey = `units_public_${objectHash(query)}`;

    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const features = new ApiFeatures(
      this.basePublicQuery(),
      query,
    )
      .filter()
      .search(['type', 'notes', 'price', 'size']);

    const total = await features.count();

    features.sort().limitFields().paginate(total);

    const units = await features.exec();

    const mappedUnits = UnitMapper.toPublicList(units);

    const response = {
      results: mappedUnits.length,
      pagination: features.paginationResult,
      data: mappedUnits,
    };

    await this.cacheManager.set(cacheKey, response);

    return response;
  }


  async findOne(id: string) {
    const cacheKey = `unit_public_${id}`;

    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const unit = await this.unitModel
      .findOne({
        _id: id,
        showInWebsite: true,
      })
      .populate('project', 'name -_id')
      .populate('area', 'name location -_id')
      .lean();

    if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    const mappedUnit = UnitMapper.toPublic(unit);

    await this.cacheManager.set(cacheKey, mappedUnit);

    return mappedUnit;
  }
}