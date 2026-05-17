import { Document, Query } from 'mongoose';
import { IPaginationResult } from '../contracts/pagination.interfaces';
import { IQueryBuilder } from '../contracts/query-builder.interface';


export class ApiFeatures<T> implements IQueryBuilder<T> {
  private mongooseQuery: Query<T[], T>;
  private queryString: Record<string, any>;
  public paginationResult?: IPaginationResult;

  constructor(
    mongooseQuery: Query<T[], T>,
    queryString: Record<string, any>,
  ) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

filter(): this {
  const excluded = ['page', 'sort', 'limit', 'fields', 'keyword'];

  const queryObj = Object.keys(this.queryString)
    .filter((key) => !excluded.includes(key))
    .reduce((acc, key) => {
      const value = this.queryString[key];

      // 🚨 ignore empty / object / undefined
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        typeof value === 'object'
      ) {
        return acc;
      }

      acc[key] = value;
      return acc;
    }, {} as Record<string, any>);

  const mongoFilter: any = {};

  Object.keys(queryObj).forEach((key) => {
    const match = key.match(/^(.+)\[(gte|gt|lte|lt|in)\]$/);

    // ================= OPERATORS =================
    if (match) {
      const field = match[1];
      const operator = `$${match[2]}`;
      const rawValue = queryObj[key];

      if (!mongoFilter[field]) mongoFilter[field] = {};

      // -------- numeric operators --------
      if (['gte', 'gt', 'lte', 'lt'].includes(match[2])) {
        const num = Number(rawValue);

        if (!isNaN(num)) {
          mongoFilter[field][operator] = num;
        }
        return;
      }

      // -------- IN operator --------
      if (match[2] === 'in' && typeof rawValue === 'string') {
        mongoFilter[field][operator] = rawValue
          .split(',')
          .map((v: string) => v.trim())
          .filter(Boolean);
      }

      return;
    }

    // ================= NORMAL FILTER =================
    mongoFilter[key] = queryObj[key];
  });

  this.mongooseQuery = this.mongooseQuery.find(mongoFilter);

  return this;
}

  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
    }
    return this;
  }

  limitFields(): this {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select('-__v');
    }
    return this;
  }

  search(searchFields: string[] = []): this {
    if (this.queryString.keyword && searchFields.length) {
      const keyword = this.queryString.keyword;
      const query = {
        $or: searchFields.map((field) => ({
          [field]: { $regex: keyword, $options: 'i' },
        })),
      };

      this.mongooseQuery = this.mongooseQuery.find(query);
    }

    return this;
  }

  paginate(totalDocuments: number): this {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    this.paginationResult = {
      currentPage: page,
      limit,
      numberOfPages: Math.ceil(totalDocuments / limit),
    };

    return this;
  }
  async count(): Promise<number> {
   const clonedQuery = this.mongooseQuery.clone();
  return clonedQuery.countDocuments();
}

  async exec(): Promise<T[]> {
    return this.mongooseQuery.exec();
  }
}