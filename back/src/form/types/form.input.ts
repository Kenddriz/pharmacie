import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateFormInput {
  @Field()
  label: string;
}
@InputType()
export class UpdateFormInput extends CreateFormInput{
  @Field(() => Int)
  id: number;
}
