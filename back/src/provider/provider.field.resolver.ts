import { Provider } from './provider.entity';
import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { ContactService } from '../contact/contact.service';
import { Contact } from '../contact/Contact.entity';

@Resolver(() => Provider)
export class ProviderFieldResolver {
  constructor(private contactService: ContactService) {}

  @ResolveField(() => [Contact])
  async contacts(@Root() provider: Provider): Promise<Contact[]> {
    return await this.contactService.findOneByProviderId(provider.id);
  }
}
