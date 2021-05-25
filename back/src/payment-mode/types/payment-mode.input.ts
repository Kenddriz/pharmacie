import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePaymentModeInput {
  @Field(() => Int)
  id: number;

  @Field()
  label: string;
}
