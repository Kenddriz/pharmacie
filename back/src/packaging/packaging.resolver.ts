import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PackagingService } from './packaging.service';
import { Packaging } from './packaging.entity';
import { uniqId } from '../utils';
import {
  CreatePackagingInput,
  UpdatePackagingInput,
} from './types/packaging.input';

@Resolver(() => Packaging)
export class PackagingResolver {
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
  @Mutation(() => Packaging)
  async softRemovePackaging(@Args({ name: 'id', type: () => Int }) id: number) {
    const pack = await this.packagingService.findOneById(id);
    return this.packagingService.softRemove(pack);
  }
  @Mutation(() => Boolean)
  async removePackaging(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.packagingService.remove(id);
  }
  @Mutation(() => Packaging)
  async restorePackaging(@Args({ name: 'id', type: () => Int }) id: number) {
    await this.packagingService.restore(id);
    return this.packagingService.findOneById(id);
  }
  @Query(() => [Packaging])
  async deletedPackaging(): Promise<Packaging[]> {
    return this.packagingService.deleted();
  }
}
