import { Provider } from './provider.entity';
import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { ContactService } from '../contact/contact.service';
import { Contact } from '../contact/Contact.entity';
import { Command } from '../command/command.entity';
import { CommandService } from '../command/command.service';

@Resolver(() => Provider)
export class ProviderFieldResolver {
  constructor(
    private contactService: ContactService,
    private commandService: CommandService,
  ) {}

  @ResolveField(() => [Contact])
  async contacts(@Root() provider: Provider): Promise<Contact[]> {
    return await this.contactService.findOneByProviderId(provider.id);
  }
  @ResolveField(() => [Command])
  async commands(@Root() provider: Provider): Promise<Command[]> {
    return await this.commandService.findPendingCommands(provider.id);
  }
}
