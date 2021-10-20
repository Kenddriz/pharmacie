import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FormService } from './form.service';
import { Form } from './form.entity';
import { uniqId } from '../utils';
import { CreateFormInput, UpdateFormInput } from './types/form.input';

@Resolver(() => Form)
export class FormResolver {
  constructor(private formService: FormService) {}

  @Mutation(() => Form, { nullable: true })
  async createForm(@Args('input') input: CreateFormInput) {
    let form = await this.formService.findOneByLabel(input.label);
    if (form) return null;
    form = new Form();
    form.id = await uniqId('Form');
    Object.assign(form, input);
    return await this.formService.save(form);
  }
  @Mutation(() => Form, { nullable: true })
  async updateForm(@Args('input') input: UpdateFormInput) {
    let form = await this.formService.findOneByLabel(input.label);
    if (form && form.id === input.id) return null;
    form = await this.formService.findOne(input.id);
    Object.assign(form, input);
    return await this.formService.save(form);
  }

  @Query(() => [Form])
  async forms() {
    return await this.formService.findAll();
  }

  @Mutation(() => Boolean)
  async deleteForm(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.formService.remove(id);
  }
  @Query(() => Int)
  async countForms() {
    return this.formService.count();
  }
}
