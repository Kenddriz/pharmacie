import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class StockMovementFormInput {
  @Field(() => Int)
  quantity: number;
  @Field(() => Float)
  price: number;
  @Field(() => Float)
  vat: number;
}
