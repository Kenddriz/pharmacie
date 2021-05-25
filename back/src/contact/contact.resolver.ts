import { Resolver, Query } from '@nestjs/graphql';
import { ContactService } from './contact.service';
import {Contact} from './Contact.entity';

@Resolver()
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Query(() => [Contact])
  async contacts() {
    return this.contactService.findAll()
  }
}
