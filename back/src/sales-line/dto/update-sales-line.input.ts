import { CreateSalesLineInput } from './create-sales-line.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSalesLineInput extends PartialType(CreateSalesLineInput) {
  @Field(() => Int)
  id: number;
}
