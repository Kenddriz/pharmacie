import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class PurchaseInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
