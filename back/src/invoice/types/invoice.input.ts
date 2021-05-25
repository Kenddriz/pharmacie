import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateInvoiceInput {

  @Field()
  dueDate: string;

  @Field()
  reference: string;
}

@InputType()
export class UpdateInvoiceInput {
  @Field()
  id: number;

  @Field()
  dueDate: string;

  @Field()
  reference: string;
}


