import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ProviderService } from './provider.service';
import { Provider } from './provider.entity';
import { CreateProviderInput } from './types/provider.input';
import { uniqId } from '../shared/id-builder.service';
import { ContactService } from '../contact/contact.service';
import { ContactTypeService } from '../contact-type/contact-type.service';
import { Contact } from '../contact/Contact.entity';
import { PaginationInput } from '../shared/shared.input';
import { ProviderPagination } from './types/provider.dto';
import { AddContactInput } from '../contact/types/contact.input';
import { ContactType } from '../contact-type/contact-type.entity';

@Resolver(() => Provider)
export class ProviderResolver {
  constructor(
    private readonly providerService: ProviderService,
    private readonly contactService: ContactService,
    private readonly contactTypeService: ContactTypeService,
  ) {}

  private async createContact(
    contacts: string[],
    cType: ContactType,
    provider: Provider,
  ): Promise<void> {
    for (const c of contacts) {
      let contact = await this.contactService.findOneByLabel(c);
      if (!contact && c.trim() !== '') {
        contact = new Contact();
        contact.id = await uniqId('Contact');
        contact.label = c;
        contact.provider = provider;
        contact.contactType = cType;
        await this.contactService.save(contact);
      }
    }
  }

  @Mutation(() => Provider)
  async createProvider(@Args('input') input: CreateProviderInput) {
    let provider = new Provider();
    provider.id = await uniqId('Provider');
    const { contactTypes, ...res } = input;
    Object.assign<Provider, Omit<CreateProviderInput, 'contactTypes'>>(
      provider,
      res,
    );
    provider = await this.providerService.save(provider);
    for (const cType of contactTypes) {
      await this.createContact(
        cType.contacts,
        await this.contactTypeService.findOneById(cType.contactTypeId),
        provider,
      );
    }
    return provider;
  }
  @Mutation(() => Provider)
  async addContacts(@Args('input') input: AddContactInput): Promise<Provider> {
    const provider = await this.providerService.findOneById(input.providerId);
    await this.createContact(
      input.contacts,
      await this.contactTypeService.findOneById(input.contactTypeId),
      provider,
    );
    return provider;
  }

  @Query(() => ProviderPagination)
  async providersPaginate(
    @Args('input') input: PaginationInput,
  ): Promise<ProviderPagination> {
    return await this.providerService.paginate(input);
  }

  @Query(() => [Provider])
  async providers(): Promise<Provider[]> {
    return await this.providerService.providers();
  }
}
