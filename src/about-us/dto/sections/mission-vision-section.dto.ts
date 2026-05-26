import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MissionVisionSectionDto {
  @ApiProperty()
  @IsString()
  mission: string;

  @ApiProperty()
  @IsString()
  vision: string;
}