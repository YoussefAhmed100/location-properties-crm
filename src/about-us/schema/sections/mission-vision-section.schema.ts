import { Prop , Schema} from '@nestjs/mongoose';
@Schema({ _id: false })

export class MissionVisionSection {
  @Prop({ required: true, type: String })
  mission: string;

  @Prop({ required: true, type: String })
  vision: string;
}