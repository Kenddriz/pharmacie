import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class InvoiceDto {
  @Field(() => Int)
  id: number;
}
