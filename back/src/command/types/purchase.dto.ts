import { PurchaseInput } from './purchase.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class PurchaseDto extends PartialType(PurchaseInput) {
  @Field(() => Int)
  id: number;
}
