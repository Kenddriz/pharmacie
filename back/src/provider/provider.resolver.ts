import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ProviderService } from './provider.service';
import { Provider } from './provider.entity';
import { CreateProviderInput } from './types/provider.input';
import { uniqId } from '../shared/id-builder.service';
import { PaginationInput } from '../shared/shared.input';
import { ProviderPagination } from './types/provider.dto';

@Resolver(() => Provider)
export class ProviderResolver {
  constructor(private providerService: ProviderService) {}

  @Mutation(() => Provider)
  async createProvider(@Args('input') input: CreateProviderInput) {
    let provider = new Provider();
    provider.id = await uniqId('Provider');
    Object.assign<Provider, CreateProviderInput>(provider, input);
    provider = await this.providerService.save(provider);
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
