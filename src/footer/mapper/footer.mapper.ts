import { ContactDocument } from "src/contact-us/schema/contact.schema";

export class FooterMapper {
    static toFooterResponse(contact: ContactDocument) {
        return {
     phone: contact.phone,
      email: contact.email,
      address: contact.address,
      socialMedia: contact.socialMedia,
        };
    }
}