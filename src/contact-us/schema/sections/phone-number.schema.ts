import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false }) 
export class PhoneNumber {
  @Prop({
    required: true,
    trim: true,
  })
  primary: string;

   @Prop({
    type: String,
    trim: true,
  })
  secondary: string;

   @Prop({
    type: String,
    trim: true,
  })
  support: string;
}

export const PhoneNumberSchema = SchemaFactory.createForClass(PhoneNumber);