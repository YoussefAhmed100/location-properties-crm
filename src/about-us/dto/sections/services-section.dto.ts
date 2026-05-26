import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class ServicesSectionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 50 })
  @IsInt()
  @Min(0)
  certifiedExperts: number;

  @ApiProperty({ example: '24/7 Support' })
  @IsString()
  instantConsultation: string;

  @ApiProperty({ example: 'Tailored for you' })
  @IsString()
  personalService: string;
}