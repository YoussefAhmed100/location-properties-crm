import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { SocialMedia } from './sections/social-media.schema';
import { PhoneNumber } from './sections/phone-number.schema';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Contact {
    
   @Prop({
    trim: true,
    type: PhoneNumber,
      
  })
  phone: PhoneNumber;

  @Prop({
    required: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
  })
  whatsapp: string;

  @Prop({
    required: true,
    trim: true,
  })
  address: string;

  @Prop({
    trim: true,
    default: 'Saturday - Thursday',
  })
  workingDays: string;

  @Prop({
    trim: true,
    default: '11:00 AM - 7:00 PM',
  })
  workingHours: string;

  @Prop({
    trim: true,
    default: 'Closed',
  })
  fridayStatus: string;

    @Prop({
    trim: true,
    type: SocialMedia,
      
  })
  socialMedia: SocialMedia;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);