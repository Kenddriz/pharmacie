import {Provider} from './provider.entity';
import {ResolveField, Resolver, Root} from '@nestjs/graphql';
import {ContactService} from '../contact/contact.service';
import {ContactTypeService} from '../contact-type/contact-type.service';
import { ContactType } from '../contact-type/contact-type.entity';

@Resolver(() => Provider)
export class ProviderFieldResolver {
    constructor(
        private contactService: ContactService,
        private contactTypeService: ContactTypeService
    ) {}

    @ResolveField(() => [ContactType])
    async contactTypes(@Root()provider: Provider): Promise<ContactType[]> {
        const types = await this.contactTypeService.findAll();
        return Promise.all(
            types.map(async type => {
                return {
                    ...type,
                    contacts: await this.contactService.findOneByProviderAndType(provider.id, type.id)
                }
            })
        );
    }
}