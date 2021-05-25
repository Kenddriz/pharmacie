import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PaymentDto {
  @Field(() => Int)
  id: number;
}
