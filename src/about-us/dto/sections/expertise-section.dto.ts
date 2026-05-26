import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class ExpertiseSectionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 95 })
  @IsInt()
  @Min(0)
  @Max(100)
  analysisAccuracy: number;

  @ApiProperty({ example: 6 })
  @IsInt()
  @Min(0)
  yearsExperience: number;

  @ApiProperty({ example: 500 })
  @IsInt()
  @Min(0)
  happyClients: number;

  @ApiProperty({ example: 1000 })
  @IsInt()
  @Min(0)
  marketReports: number;
  @ApiProperty({ example: 1000 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  closedDeals: number;
}