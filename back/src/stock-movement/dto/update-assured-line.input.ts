import { StockMovementInput } from './stock-movement.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStockMovementInput extends PartialType(StockMovementInput) {
  @Field(() => Int)
  id: number;
}
