import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { HeroSectionDto } from './sections/hero-section.dto';
import { ServicesSectionDto } from './sections/services-section.dto';
import { ExpertiseSectionDto } from './sections/expertise-section.dto';
import { TrustSectionDto } from './sections/trust-section.dto';
import { MissionVisionSectionDto } from './sections/mission-vision-section.dto';

export class CreateAboutDto {
  @ApiProperty({ type: HeroSectionDto })
  @ValidateNested()
  @Type(() => HeroSectionDto)
  heroSection: HeroSectionDto;

  @ApiProperty({ type: ServicesSectionDto })
  @ValidateNested()
  @Type(() => ServicesSectionDto)
  servicesSection: ServicesSectionDto;

  @ApiProperty({ type: ExpertiseSectionDto })
  @ValidateNested()
  @Type(() => ExpertiseSectionDto)
  expertiseSection: ExpertiseSectionDto;

  @ApiProperty({ type: TrustSectionDto })
  @ValidateNested()
  @Type(() => TrustSectionDto)
  trustSection: TrustSectionDto;

  @ApiProperty({ type: MissionVisionSectionDto })
  @ValidateNested()
  @Type(() => MissionVisionSectionDto)
  missionVisionSection: MissionVisionSectionDto;
}