import {
  InputType,
  Field,
  Float,
  OmitType,
  PartialType,
  Int,
} from '@nestjs/graphql';
import { StockMovementFormInput } from '../../stock-movement/dto/stock-movement.input';
import { BatchFormInput } from '../../batch/dto/batch.input';
import { PaginationInput } from '../../shared/shared.input';

@InputType()
export class AssuredLineInput extends StockMovementFormInput {
  /**For Batch*/
  @Field()
  medicineId: number;
  @Field()
  expirationDate: string;
  /**End batch*/
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
export class UpdateAssuredLineInput {
  @Field(() => Int)
  id: number;
  @Field(() => Boolean)
  updateCurVat: boolean;
  @Field(() => BatchFormInput)
  batch: BatchFormInput;
  @Field(() => StockMovementFormInput)
  assuredLine: StockMovementFormInput;
}

@InputType()
export class UpdateInvoiceInput extends PartialType(
  OmitType(InvoiceInput, ['commandId'] as const),
) {
  @Field()
  id: number;
}

@InputType()
export class PaginateInvoiceInput extends PaginationInput {
  @Field({ nullable: true })
  paymentId?: number;
}

