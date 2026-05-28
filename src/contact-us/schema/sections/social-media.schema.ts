import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class SocialMedia {

  @Prop({
    type: String,
    trim: true,
   required: true,
  })
  instagram: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
  })
  facebook: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
  })
  tiktok: string;

    @Prop({
    trim: true,
    type: String,
   
  })
  linkedin: string;
}