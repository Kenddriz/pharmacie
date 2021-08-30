import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SavePaymentInput {
  @Field()
  id: number;
  @Field()
  reference: string;

  @Field()
  description: string;

  @Field()
  date: string;

  @Field()
  invoiceId: number;

  @Field()
  paymentModeId: number;
}
