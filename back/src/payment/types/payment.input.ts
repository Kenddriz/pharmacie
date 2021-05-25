import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field()
  reference: number;

  @Field()
  description: string;

  @Field()
  date: string;

  @Field()
  invoiceId: number;

  @Field()
  paymentMode: string;
}

@InputType()
export class UpdatePaymentInput {
  @Field()
  id: number;
}
