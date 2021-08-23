import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FormService } from './form.service';
import { Form } from './form.entity';
import { FormInput } from './types/form.input';
import { uniqId } from '../shared/id-builder.service';

@Resolver(() => Form)
export class FormResolver {
  constructor(private readonly formService: FormService) {}

  @Mutation(() => Form)
  async saveForm(@Args('input') input: FormInput) {
    let form: Form;
    const { id, ...res } = input;
    if (id > 0) form = await this.formService.findOne(id);
    else {
      form = new Form();
      form.id = await uniqId('Form');
    }
    Object.assign(form, res);
    return await this.formService.save(form);
  }

  @Query(() => [Form])
  async forms() {
    return await this.formService.findAll();
  }

  @Mutation(() => Form)
  removeForm(@Args('id', { type: () => Int }) id: number) {
    return this.formService.remove(id);
  }
}
