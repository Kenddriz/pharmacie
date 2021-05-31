import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateMedicineFormInput {
  @Field(() => Int, { nullable: true })
  medicineId?: number;

  @Field(() => Int)
  formId: number;

  @Field(() => Int)
  unitId: number;

  @Field()
  price: number;

  @Field()
  vat: number;

  @Field()
  quantity: number;
}
