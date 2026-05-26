import { Prop , Schema} from '@nestjs/mongoose';
@Schema({ _id: false })
export class ServicesSection {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  certifiedExperts: number;

  @Prop({ required: true })
  instantConsultation: string;

  @Prop({ required: true })
  personalService: string;
}