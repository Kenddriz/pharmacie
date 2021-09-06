import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class AssuredLineInput {
  /**For Batch*/
  @Field()
  medicineId: number;
  @Field()
  expirationDate: string;
  /**End batch*/
  @Field(() => Float)
  price: number;
  @Field(() => Float)
  vat: number;
  @Field(() => Float)
  discount: number;
  @Field()
  quantity: number;
}

@InputType()
export class InvoiceInput {
  @Field()
  commandId: number;
  @Field()
  dueDate: string;
  @Field()
  reference: string;
  @Field(() => Float)
  expense: number;
  @Field()
  deliveryDate: string;
}

@InputType()
export class CreateInvoiceInput {
  @Field(() => InvoiceInput)
  invoice: InvoiceInput;
  @Field(() => [AssuredLineInput])
  assuredLines: AssuredLineInput[];
}

@InputType()
export class UpdateInvoiceInput {
  @Field()
  id: number;
  @Field(() => InvoiceInput)
  invoice: InvoiceInput;
}
