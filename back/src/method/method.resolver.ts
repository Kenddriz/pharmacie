import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MethodService } from './method.service';
import { Method } from './method.entity';
import { MethodInput } from './dto/method.input';
import { uniqId } from '../utils';

@Resolver(() => Method)
export class MethodResolver {
  constructor(private methodService: MethodService) {}
  @Query(() => [Method])
  async methods(): Promise<Method[]> {
    return this.methodService.findAll();
  }
  @Mutation(() => Method)
  async createMethod(@Args('input') input: MethodInput) {
    let method = await this.methodService.findOneByLabel(input.label);
    if (method) throw new Error('exist');
    method = new Method();
    method.id = await uniqId('Method');
    Object.assign<Method, MethodInput>(method, input);
    return this.methodService.save(method);
  }
  @Mutation(() => Method)
  async updateMethod(@Args('input') input: MethodInput) {
    const method = await this.methodService.findOneById(input.id);
    Object.assign<Method, MethodInput>(method, input);
    return this.methodService.save(method);
  }
  @Mutation(() => Boolean)
  async removeMethod(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.methodService.remove(id);
  }
}
