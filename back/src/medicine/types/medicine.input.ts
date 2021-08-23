import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class MedicineInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  articleId: number;

  @Field(() => Int)
  formId: number;

  @Field(() => Int)
  dosageId: number;

  @Field(() => Int)
  packagingId: number;
}
@InputType()
export class DeleteMedicineInput {
  @Field(() => Int)
  medicineId: number;

  @Field(() => Int)
  articleId: number;
}
