import { Resolver, ResolveField, Root } from '@nestjs/graphql';
import { Command } from '../command.entity';
import { CommandLine } from '../../command-line/command-line.entity';
import { CommandLineService } from '../../command-line/command-line.service';
import { Provider } from '../../provider/provider.entity';
import { ProviderService } from '../../provider/provider.service';

@Resolver(() => Command)
export class CommandFieldResolver {
  constructor(
    private readonly commandLineService: CommandLineService,
    private readonly providerService: ProviderService,
  ) {}

  @ResolveField(() => [CommandLine])
  async commandLines(@Root() command: Command): Promise<CommandLine[]> {
    return await this.commandLineService.findByCommandId(command.id);
  }
  @ResolveField(() => Provider)
  async provider(@Root() command: Command): Promise<Provider> {
    return await this.providerService.findOneById(command.providerId);
  }
}
