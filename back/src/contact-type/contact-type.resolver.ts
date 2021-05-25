import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ContactTypeService } from './contact-type.service';
import { ContactType } from './contact-type.entity';
import {CreateContactTypeInput, UpdateContactTypeInput} from './types/contact-type.input';
import {uniqId} from '../shared/id-builder.service';

@Resolver(() => ContactType)
export class ContactTypeResolver {
  constructor(private readonly contactTypeService: ContactTypeService) {}

  @Mutation(() => ContactType)
  async createContactType(@Args('input') input: CreateContactTypeInput): Promise<ContactType> {
    let type = await this.contactTypeService.findOneByLabel(input.label);
    if(type) throw new Error('Le type de contact ' + type.label + ' existe déjà ...');
    type = new ContactType();
    type.id = await uniqId('ContactType');
    Object.assign<ContactType, CreateContactTypeInput>(type, input);
    return await this.contactTypeService.save(type);
  }

  @Query(() => [ContactType])
  async contactTypes() {
    return this.contactTypeService.findAll();
  }

  @Mutation(() => ContactType)
  async updateContactType(@Args('input') input: UpdateContactTypeInput): Promise<ContactType> {
    let type = await this.contactTypeService.findOneByLabel(input.label);
    if(type && type.id !== input.id)
      throw new Error('Le type de contact ' + type.label + ' existe déjà ...');
    type = await this.contactTypeService.findOneById(input.id);
    Object.assign<ContactType, UpdateContactTypeInput>(type, input);
    return await this.contactTypeService.save(type);
  }
}
