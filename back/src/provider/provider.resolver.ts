import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { ProviderService } from './provider.service';
import { Provider } from './provider.entity';
import { SaveProviderInput } from './types/provider.input';
import { uniqId } from '../shared/id-builder.service';
import { PaginationInput, Upload } from '../shared/shared.input';
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
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { GraphQLUpload } from 'graphql-upload';
import { removeFile } from '../shared/remove-file.service';
import { upload } from '../shared/uploader.service';

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
  @Mutation(() => Boolean)
  async removeProvider(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.providerService.remove(id);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Provider)
  async updateProviderAvatar(
    @Args({ name: 'avatar', type: () => GraphQLUpload }) file: Upload,
    @Args({ name: 'id', type: () => Int }) id: number,
  ) {
    const provider = await this.providerService.findOneById(id);
    removeFile('avatars/providers/' + provider.avatar);
    const { filename } = await upload(file, 'avatars/providers', provider.id);
    provider.avatar = filename;
    return this.providerService.save(provider);
  }
  @Query(() => ProviderPagination)
  async paginateDeletedProvider(
    @Args('input') input: PaginationInput,
  ): Promise<ProviderPagination> {
    return this.providerService.paginateDeleted(input);
  }
}
