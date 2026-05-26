import { PartialType } from '@nestjs/mapped-types';
import { CreateAboutDto } from './create-about-us.dto';

export class UpdateAboutDto extends PartialType(
  CreateAboutDto,
) {}