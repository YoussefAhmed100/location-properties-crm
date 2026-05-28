import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSocialMediaDto {
  @ApiProperty({
    example: 'https://instagram.com/example',
    description: 'Instagram profile URL',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  instagram: string;

  @ApiProperty({
    example: 'https://facebook.com/example',
    description: 'Facebook page URL',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  facebook: string;

  @ApiProperty({
    example: 'https://tiktok.com/@example',
    description: 'TikTok profile URL',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  tiktok: string;

  @ApiPropertyOptional({
    example: 'https://linkedin.com/company/example',
    description: 'LinkedIn profile URL (optional)',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  linkedin?: string;
}