import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { SaleLineInput } from '../../sale/dto/sale.input';

@InputType()
export class StockMovementFormInput {
  @Field(() => Int)
  quantity: number;
  @Field(() => Float)
  price: number;
  @Field(() => Float)
  vat: number;
  @Field(() => Float)
  discount: number;
}
@InputType()
export class PaginateStockMovementInput {
  @Field()
  medicineId: number;
  @Field()
  page: number;
  @Field()
  limit: number;
}

@InputType()
export class CancelSaleLinesInput {
  @Field(() => Int)
  saleId: number;

  @Field(() => [Int])
  saleLineIds: number[];
}
