import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DealStatus } from '../schema/deal.schema';

export class UpdateDealStatusDto {
  @ApiProperty({
    enum: DealStatus,
    example: DealStatus.NEW,
    description: 'Deal status',
  })
  @IsEnum(DealStatus)
  status: DealStatus;
}