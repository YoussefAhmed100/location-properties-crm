import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { HeroSection } from './sections/hero-section.schema';
import { ServicesSection } from './sections/services-section.schema';
import { ExpertiseSection } from './sections/expertise-section.schema';
import { TrustSection } from './sections/trust-section.schema';
import { MissionVisionSection } from './sections/mission-vision-section.schema';

export type AboutDocument = HydratedDocument<About>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class About {
  @Prop({
    type: HeroSection,
    required: true,
  })
  heroSection: HeroSection;

  @Prop({
    type: ServicesSection,
    required: true,
  })
  servicesSection: ServicesSection;

  @Prop({
    type: ExpertiseSection,
    required: true,
  })
  expertiseSection: ExpertiseSection;

  @Prop({
    type: TrustSection,
    required: true,
  })
  trustSection: TrustSection;

  @Prop({
    type: MissionVisionSection,
    required: true,
  })
  missionVisionSection: MissionVisionSection;
}

export const AboutSchema = SchemaFactory.createForClass(About);