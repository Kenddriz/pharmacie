import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { PaginationInput } from '../../shared/shared.input';

@InputType()
export class MedicineFormInput {
  @Field(() => Int)
  formId: number;

  @Field(() => Int)
  dosageId: number;

  @Field(() => Int)
  packagingId: number;

  @Field(() => Float)
  currentSalePrice: number;

  @Field(() => Float)
  currentVat: number;
}

@InputType()
export class CreateMedicineInput {
  @Field(() => Int)
  articleId: number;
  @Field(() => MedicineFormInput)
  form: MedicineFormInput;
}
@InputType()
export class UpdateMedicineInput {
  @Field(() => Int)
  id: number;
  @Field(() => MedicineFormInput)
  form: MedicineFormInput;
}
@InputType()
export class DeleteMedicineInput {
  @Field(() => Int)
  medicineId: number;

  @Field(() => Int)
  articleId: number;
}
@InputType()
export class FindByMeasureInput extends PaginationInput{
  @Field(() => Int)
  measureId: number;
  @Field(() => String)
  foreignKey: 'formId' | 'dosageId' | 'packagingId';
}
