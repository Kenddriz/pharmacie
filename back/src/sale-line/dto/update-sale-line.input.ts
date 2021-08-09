import { CreateSaleLineInput } from './create-sale-line.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSaleLineInput extends PartialType(CreateSaleLineInput) {
  @Field(() => Int)
  id: number;
}
