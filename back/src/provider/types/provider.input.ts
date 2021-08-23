import { InputType, Field } from '@nestjs/graphql';

/**Add parent to a category*/
@InputType()
export class ContactInput {
  @Field()
  type: number;
  @Field(() => [String])
  list: string[];
}

@InputType()
export class SaveProviderInput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field(() => [ContactInput])
  contacts: ContactInput[];
}

@InputType()
export class UpdateProviderInput {
  @Field()
  id: number;

  @Field()
  name: string;
}
