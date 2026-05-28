import { Module } from '@nestjs/common';
import { FooterService } from './footer.service';
import { FooterController } from './footer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from 'src/contact-us/schema/contact.schema';

@Module({
    imports: [
      MongooseModule.forFeature([
        {
          name: Contact.name,
          schema: ContactSchema,
        },
      ]),
    ],
  
  controllers: [FooterController],
  providers: [FooterService],
})
export class FooterModule {}
