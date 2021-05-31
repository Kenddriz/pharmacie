import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FormService } from './form.service';
import { Form } from './form.entity';
import { CreateFormInput, UpdateFormInput } from './types/update.form.input';
import { uniqId } from '../shared/id-builder.service';

@Resolver(() => Form)
export class FormResolver {
  constructor(private readonly formService: FormService) {}

  @Mutation(() => Form)
  async createForm(@Args('input') input: CreateFormInput) {
    let form = await this.formService.findOneByLabel(input.label);
    if (!form) {
      form = new Form();
      form.id = await uniqId('Form');
      Object.assign<Form, CreateFormInput>(form, input);
    }
    return await this.formService.save(form);
  }

  @Query(() => [Form])
  async forms() {
    return await this.formService.findAll();
  }

  @Mutation(() => Form)
  async updateForm(@Args('input') input: UpdateFormInput) {
    const form = await this.formService.findOneById(input.id);
    Object.assign<Form, UpdateFormInput>(form, input);
    return this.formService.save(form);
  }

  @Mutation(() => Form)
  removeForm(@Args('id', { type: () => Int }) id: number) {
    return this.formService.remove(id);
  }
}
