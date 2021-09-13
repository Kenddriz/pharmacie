import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MethodService } from './method.service';
import { Method } from './method.entity';
import { MethodInput } from './dto/method.input';
import { uniqId } from '../shared/id-builder.service';

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
    method = await this.methodService.save(method);
    return method;
  }
  @Mutation(() => Method)
  async updateMethod(@Args('input') input: MethodInput) {
    const method = await this.methodService.findOneById(input.id);
    Object.assign<Method, MethodInput>(method, input);
    return await this.methodService.save(method);
  }
}
