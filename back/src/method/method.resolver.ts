import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MethodService } from './method.service';
import { Method } from './method.entity';
import { CreateMethodInput } from './dto/create-method.input';
import { UpdateMethodInput } from './dto/update-method.input';

@Resolver(() => Method)
export class MethodResolver {
  constructor(private readonly methodService: MethodService) {}

  @Mutation(() => Method)
  createMethod(@Args('createMethodInput') createMethodInput: CreateMethodInput) {
    return this.methodService.create(createMethodInput);
  }

  @Query(() => [Method], { name: 'method' })
  findAll() {
    return this.methodService.findAll();
  }

  @Query(() => Method, { name: 'method' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.methodService.findOne(id);
  }

  @Mutation(() => Method)
  updateMethod(@Args('updateMethodInput') updateMethodInput: UpdateMethodInput) {
    return this.methodService.update(updateMethodInput.id, updateMethodInput);
  }

  @Mutation(() => Method)
  removeMethod(@Args('id', { type: () => Int }) id: number) {
    return this.methodService.remove(id);
  }
}
