import {InputType, Field, PartialType} from '@nestjs/graphql';

@InputType()
export class CreateContactTypeInput {
  @Field()
  label: string;
}

@InputType()
export class UpdateContactTypeInput extends PartialType(CreateContactTypeInput, InputType) {
  @Field()
  id: number;
}
