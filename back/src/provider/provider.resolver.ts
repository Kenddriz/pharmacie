import {Resolver, Mutation, Args, Query} from '@nestjs/graphql';
import { ProviderService } from './provider.service';
import { Provider } from './provider.entity';
import {CreateProviderInput} from './types/provider.input';
import { uniqId } from '../shared/id-builder.service';
import {ContactService} from '../contact/contact.service';
import {ContactTypeService} from '../contact-type/contact-type.service';
import {Contact} from '../contact/Contact.entity';
import {PaginationInput} from '../shared/shared.input';
import {ProviderPagination} from './types/provider.dto';

@Resolver(() => Provider)
export class ProviderResolver {
  constructor(
      private readonly providerService: ProviderService,
      private readonly contactService: ContactService,
      private readonly contactTypeService: ContactTypeService
  ) {}

  @Mutation(() => Provider)
  async createProvider(
    @Args('input') input: CreateProviderInput,
  ) {
    let provider = new Provider();
    provider.id = await uniqId('Provider');
    const { contactTypes, ...res} = input;
    Object.assign<Provider, Omit<CreateProviderInput, 'contactTypes'>>(provider, res);
   provider = await this.providerService.save(provider);

   for(const cType of contactTypes) {
     for(const c of cType.contacts) {
       let contact = await this.contactService.findOneByLabel(c);
       if(!contact){
         contact = new Contact();
         contact.id = await uniqId('Contact');
         contact.label = c;
         contact.provider = provider;
         contact.contactType = await this.contactTypeService.findOneById(cType.contactTypeId);
         await this.contactService.save(contact);
       }
       await this.contactService.save(contact);
     }
   }
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
