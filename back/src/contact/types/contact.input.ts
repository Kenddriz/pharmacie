import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateContactInput {
  @Field()
  contactTypeId: number;

  @Field(() => [String])
  contacts: string[];
}
@InputType()
export class AddContactInput {
  @Field()
  providerId: number;

  @Field()
  contactTypeId: number;

  @Field(() => [String])
  contacts: string[];
}

@InputType()
export class UpdateContactInput {
  @Field()
  id: number;

  @Field()
  label: string;
}
