import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PaymentFormInput {
  @Field()
  methodeId: number;

  @Field()
  reference: string;

  @Field({ defaultValue: '' })
  note: string;

  @Field()
  date: string;
}
@InputType()
export class CreatePaymentInput {
  @Field()
  invoiceId: number;
  @Field(() => PaymentFormInput)
  form: PaymentFormInput;
}
@InputType()
export class UpdatePaymentInput {
  @Field()
  id: number;
  @Field(() => PaymentFormInput)
  form: PaymentFormInput;
}
