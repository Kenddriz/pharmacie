import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BatchService } from './batch.service';
import { Batch } from './batch.entity';
import { CreateParcelInput } from './dto/create-parcel.input';
import { UpdateParcelInput } from './dto/update-parcel.input';

@Resolver(() => Batch)
export class BatchResolver {
  constructor(private readonly parcelService: BatchService) {}

  @Mutation(() => Batch)
  createParcel(
    @Args('createParcelInput') createParcelInput: CreateParcelInput,
  ) {
    return this.parcelService.create(createParcelInput);
  }

  @Query(() => [Batch], { name: 'parcel' })
  findAll() {
    return this.parcelService.findAll();
  }

  @Query(() => Batch, { name: 'parcel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.parcelService.findOne(id);
  }

  @Mutation(() => Batch)
  updateParcel(
    @Args('updateParcelInput') updateParcelInput: UpdateParcelInput,
  ) {
    return this.parcelService.update(updateParcelInput.id, updateParcelInput);
  }

  @Mutation(() => Batch)
  removeParcel(@Args('id', { type: () => Int }) id: number) {
    return this.parcelService.remove(id);
  }
}
