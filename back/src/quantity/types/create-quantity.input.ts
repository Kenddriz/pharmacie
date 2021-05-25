import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuantityInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
