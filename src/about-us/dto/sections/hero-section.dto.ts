import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HeroSectionDto {
  @ApiProperty({
    example: 'About Us',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'We are a leading real estate company...',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}