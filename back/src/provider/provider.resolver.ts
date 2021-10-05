import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { ProviderService } from './provider.service';
import { Provider } from './provider.entity';
import { SaveProviderInput } from './types/provider.input';
import { uniqId } from '../shared/id-builder.service';
import { PaginationInput } from '../shared/shared.input';
import { ProviderPagination } from './types/provider.dto';
import { CommandService } from '../command/command.service';
import {
  CommandPagination,
  ProviderCommandsChart,
} from '../command/dto/command.dto';
import {
  ProviderCommandsChartInput,
  ProviderCommandsInput,
} from '../command/dto/command.input';

@Resolver(() => Provider)
export class ProviderResolver {
  constructor(
    private providerService: ProviderService,
    private commandService: CommandService,
  ) {}

  @Mutation(() => Provider)
  async saveProvider(@Args('input') input: SaveProviderInput) {
    let provider: Provider;
    const { id, ...res } = input;
    if (id > 0) provider = await this.providerService.findOneById(id);
    else {
      provider = new Provider();
      provider.id = await uniqId('Provider');
    }
    Object.assign<Provider, typeof res>(provider, res);
    return await this.providerService.save(provider);
  }

  @Query(() => ProviderPagination)
  async paginateProviders(
    @Args('input') input: PaginationInput,
  ): Promise<ProviderPagination> {
    return await this.providerService.paginate(input);
  }

  @Query(() => [Provider])
  async providers(): Promise<Provider[]> {
    return await this.providerService.providers();
  }
  @Query(() => CommandPagination)
  async providerCommands(
    @Args('input') input: ProviderCommandsInput,
  ): Promise<CommandPagination> {
    return this.commandService.providerCommands(input);
  }
  @Query(() => [ProviderCommandsChart])
  async providerCommandsChart(
    @Args('input') input: ProviderCommandsChartInput,
  ): Promise<ProviderCommandsChart[]> {
    return this.commandService.providerCommandsChart(input);
  }
  @Query(() => Int)
  async countProviders() {
    return this.providerService.count();
  }
  @Query(() => Boolean)
  async removeProvider(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.providerService.remove(id);
  }
}
