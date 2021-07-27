import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';
import { CreateContactInput } from '../../contact/types/contact.input';
import { Provider } from '../provider.entity';

@InputType()
export class CreateProviderInput {
  @Field()
  name: string;

  @Field()
  address: string;

  @Field(() => [CreateContactInput])
  contactTypes: CreateContactInput[];
}

@InputType()
export class UpdateProviderInput {
  @Field()
  id: number;

  @Field()
  name: string;
}
