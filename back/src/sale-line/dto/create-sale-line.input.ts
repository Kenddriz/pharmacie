import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSaleLineInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
