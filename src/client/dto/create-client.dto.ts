import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { IsInternationalPhoneNumber } from 'src/common/validators/is-phone.validator';


export class CreateClientDto {
  @ApiProperty({
    example: 'Ahmed Mohamed',
    description: 'Full name of the client',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: '+201234567890',
    description: 'Egyptian or Saudi phone number',
  })
  @IsString()
  @IsNotEmpty()
   @IsInternationalPhoneNumber({
    message: 'Invalid phone number',
  })
  phone: string;
  
  @ApiProperty({
    example: 'ahmed@gmail.com',
    description: 'Client email address',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Cairo',
    description: 'City of the client',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Person assigned to the client',
  })
  @IsNotEmpty()
  @IsString()
   createdBy: string;

  @ApiProperty({
    example: 'Egypt',
    description: 'Country of the client',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiPropertyOptional({
    example: 'VIP client - high priority',
    description: 'Additional notes about the client',
  })
  @IsString()
  @IsOptional()
  notes?: string;
}