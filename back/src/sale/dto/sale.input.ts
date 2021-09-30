import { InputType, Int, Field } from '@nestjs/graphql';
import { StockMovementFormInput } from '../../stock-movement/dto/stock-movement.input';
import { PrescriptionInput } from '../../prescription/dto/prescription.input';

@InputType()
export class SaleLineInput extends StockMovementFormInput {
  @Field(() => Int)
  batchId: number;
}
@InputType()
export class CreateSaleInput {
  @Field(() => PrescriptionInput, { nullable: true })
  prescription?: PrescriptionInput;
  @Field(() => [SaleLineInput])
  saleLines: SaleLineInput[];
}

@InputType()
export class UpdateSaleLineInput extends SaleLineInput {
  @Field(() => Int)
  id: number;
}
@InputType()
export class AddSaleLineInput {
  @Field(() => Int)
  saleId: number;

  @Field(() => [SaleLineInput])
  saleLines: SaleLineInput[];
}

@InputType()
export class PaginatePatientSalesInput {
  @Field(() => Int)
  patientId: number;
  @Field(() => Int)
  page: number;
  @Field(() => Int)
  limit: number;
}
