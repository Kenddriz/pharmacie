import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class FormInput {
  @Field(() => Int)
  id: number;
  @Field()
  label: string;
}
