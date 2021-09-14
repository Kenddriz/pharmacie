import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ProviderService } from './provider.service';
import { Provider } from './provider.entity';
import { SaveProviderInput } from './types/provider.input';
import { uniqId } from '../shared/id-builder.service';
import { PaginationInput } from '../shared/shared.input';
import { ProviderPagination } from './types/provider.dto';

@Resolver(() => Provider)
export class ProviderResolver {
  constructor(private providerService: ProviderService) {}

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
  async findProviders(
    @Args({ name: 'keyword', type: () => String }) keyword: string,
  ): Promise<Provider[]> {
    return await this.providerService.findProviders(keyword);
  }

  @Query(() => [Provider])
  async providers(): Promise<Provider[]> {
    return await this.providerService.providers();
  }
}
