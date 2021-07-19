import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateMedicineFormInput {
  @Field(() => Int, { nullable: true })
  medicineId: number;

  @Field(() => Int)
  formId: number;

  @Field(() => Int)
  unitId: number;

  @Field()
  expiration: string;

  @Field()
  price: number;

  @Field()
  vat: number;

  @Field()
  quantity: number;
}

@InputType()
export class UpdateMedicineFormInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  medicineId: number;

  @Field(() => Int)
  formId: number;

  @Field(() => Int)
  unitId: number;

  @Field()
  expiration: string;

  @Field()
  price: number;

  @Field()
  vat: number;

  @Field()
  stock: number;

  @Field()
  shop: number;
}
