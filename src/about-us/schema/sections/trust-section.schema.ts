import { Prop , Schema} from '@nestjs/mongoose';
@Schema({ _id: false })

export class TrustSection {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: Number })
  clientSatisfaction: number;
}