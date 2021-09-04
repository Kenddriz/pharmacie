import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class MedicineInputForm {
  @Field(() => Int)
  articleId: number;

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
export class UpdateMedicineInput {
  @Field(() => Int)
  id: number;
  @Field(() => MedicineInputForm)
  form: MedicineInputForm;
}
@InputType()
export class DeleteMedicineInput {
  @Field(() => Int)
  medicineId: number;

  @Field(() => Int)
  articleId: number;
}
