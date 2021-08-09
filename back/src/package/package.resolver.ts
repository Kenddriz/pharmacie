import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PackagingService } from './packaging.service';
import { Packaging } from './packaging.entity';
import { uniqId } from '../shared/id-builder.service';
import {
  CreatePackagingInput,
  UpdatePackagingInput,
} from './types/packaging.input';

@Resolver(() => Packaging)
export class PackageResolver {
  constructor(private packagingService: PackagingService) {}

  @Mutation(() => Packaging)
  async createPackaging(
    @Args({ name: 'input', type: () => [CreatePackagingInput] })
    input: CreatePackagingInput[],
  ) {
    /**Make sure that new category doesn't exist*/
    /**Save the new category, surely not exist*/
    const packaging = new Packaging();
    packaging.id = await uniqId('Packaging');
    packaging.units = input;
    return await this.packagingService.save(packaging);
  }

  @Query(() => [Packaging])
  async packaging(): Promise<Packaging[]> {
    return await this.packagingService.findAll();
  }

  @Mutation(() => Packaging)
  async updatePackaging(
    @Args('input') input: UpdatePackagingInput,
  ): Promise<Packaging> {
    const packaging = await this.packagingService.findOneById(input.id);
    packaging.units = input.units;
    return await this.packagingService.save(packaging);
  }
}
