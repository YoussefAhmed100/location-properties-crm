import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DealStatus } from '../schema/deal.schema';
import { Exists } from 'src/common/validators/id-exists.validator';

export class CreateDealDto {
  @ApiProperty({
    example: 'New Deal',
    description: 'Deal title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 500000,
    description: 'Deal value',
  })
  @IsNumber()
  @Min(0)
  value: number;

  @ApiPropertyOptional({
    enum: DealStatus,
    example: DealStatus.NEW,
  })
  @IsEnum(DealStatus)
  @IsOptional()
  status: DealStatus;

  @ApiProperty({
    example: '60d21b4667d0d8992e610c85',
  })
  @IsMongoId()
  @Exists('Unit')
  unit: string;

  @ApiProperty({
    example: '60d21b4667d0d8992e610c86',
  })
  @IsMongoId()
  @Exists('User')
  salesAgent: string;

  @ApiProperty({
    example: 'Client Name',
  })
  @IsString()
  client: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  notes: string;
}