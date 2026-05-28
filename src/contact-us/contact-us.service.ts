import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Contact,
  ContactDocument,
} from './schema/contact.schema';

import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';

@Injectable()
export class ContactUsService {

  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<ContactDocument>,
  ) {}

  async create(
    createContactDto: CreateContactUsDto,
  ): Promise<Contact> {

    const exists = await this.contactModel.exists({});

    if (exists) {
      throw new BadRequestException(
        'Contact info already exists',
      );
    }

    return await this.contactModel.create(
      createContactDto,
    );
  }

  async findOne(): Promise<Contact> {

    const contact = await this.contactModel.findOne().lean();

    if (!contact) {
      throw new NotFoundException(
        'Contact info not found',
      );
    }

    return contact;
  }

  async update(
    id: string,
    updateContactUsDto: UpdateContactUsDto,
  ): Promise<Contact> {

    const updatedContact =
      await this.contactModel.findByIdAndUpdate(
        id,
        updateContactUsDto,
        {
          returnDocument: 'after',
          runValidators: true,
        },
      );

      if (!updatedContact) {
        throw new NotFoundException(
          'Contact info not found',
        );
      }

 

    return updatedContact;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedContact =
      await this.contactModel.findByIdAndDelete(
        id,
      ); 
      if (!deletedContact) {
        throw new NotFoundException(
          'Contact info not found',
        );
      }

    return { message: 'Contact info deleted successfully' };
  }
}