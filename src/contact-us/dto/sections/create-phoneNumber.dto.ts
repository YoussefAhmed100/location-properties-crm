import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { IsInternationalPhoneNumber } from 'src/common/validators/is-phone.validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePhoneNumberDto {
  @ApiProperty({
    example: '+20 100 123 4567',
    description: 'Primary phone number (required)',
  })
  @IsString()
  @IsNotEmpty()
  @IsInternationalPhoneNumber({
    message: 'Invalid primary phone number',
  })
  primary: string;

  @ApiPropertyOptional({
    example: '+20 111 222 3333',
    description: 'Secondary phone number (optional)',
  })
  @IsOptional()
  @IsString()
  @IsInternationalPhoneNumber({
    message: 'Invalid secondary phone number',
  })
  secondary?: string;

  @ApiPropertyOptional({
    example: '+20 122 333 4444',
    description: 'Support phone number (optional)',
  })
  @IsOptional()
  @IsString()
  @IsInternationalPhoneNumber({
    message: 'Invalid support phone number',
  })
  support?: string;
}