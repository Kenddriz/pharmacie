import { InputType, Field } from '@nestjs/graphql';
import {CreateContactInput} from '../../contact/types/contact.input';

@InputType()
export class CreateProviderInput {
  @Field()
  name: string;

  @Field(() => [CreateContactInput])
  contactTypes: CreateContactInput[];
}

@InputType()
export class UpdateProviderInput {
  @Field()
  id: number;

  @Field()
  name: number;
}
