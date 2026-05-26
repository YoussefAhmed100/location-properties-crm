import { Prop , Schema} from '@nestjs/mongoose';
@Schema({ _id: false })
export class ExpertiseSection {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: Number })
  analysisAccuracy: number;

  @Prop({ required: true, type: Number })
  yearsExperience: number;

  @Prop({ required: true, type: Number })
  happyClients: number;

  @Prop({ required: true, type: Number })
  marketReports: number;
}