import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PaymentModeInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  label: string;
}
