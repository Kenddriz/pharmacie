import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Contact } from './Contact.entity';
import { ContactService } from './contact.service';
import { UpdateContactInput } from './types/contact.input';

@Resolver(() => Contact)
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}
  @Mutation(() => Contact)
  async updateContact(
    @Args('input') input: UpdateContactInput,
  ): Promise<Contact> {
    const contact = await this.contactService.findOneById(input.id);
    Object.assign<Contact, UpdateContactInput>(contact, input);
    return await this.contactService.save(contact);
  }
}
