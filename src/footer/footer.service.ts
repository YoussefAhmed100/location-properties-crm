import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FooterMapper } from './mapper/footer.mapper';
import { Contact, ContactDocument } from 'src/contact-us/schema/contact.schema';
import { Model } from 'mongoose';
 
@Injectable()
export class FooterService {
    constructor(
        @InjectModel(Contact.name) 
        private readonly contactModel: Model<ContactDocument>

    ){}

    async getFooterData() {
        const contact = await this.contactModel.findOne().lean();
        if (!contact) {
            throw new NotFoundException('Contact information not found');
        }
        return FooterMapper.toFooterResponse(contact);
    }



}
