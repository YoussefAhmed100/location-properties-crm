import { Prop , Schema} from '@nestjs/mongoose';
@Schema({ _id: false })

export class HeroSection {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}