import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateFormInput {
  @Field()
  label: string;
}

@InputType()
export class UpdateFormInput extends PartialType(
  CreateFormInput,
) {
  @Field(() => Int)
  id: number;
}
