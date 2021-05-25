import {InputType, Field, PartialType} from '@nestjs/graphql';

@InputType()
export class CreateContactInput {

  @Field()
  contactTypeId: number;

  @Field(() => [String])
  contacts: string[];
}

@InputType()
export class UpdateContactInput extends PartialType(CreateContactInput, InputType) {
  @Field()
  id: number;
}