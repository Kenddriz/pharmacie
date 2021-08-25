import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateBatchInput {
  @Field(() => Int)
  medicineId: number;
  @Field()
  manufactureDate: string;
  @Field()
  expirationDate: string;
  @Field(() => Int)
  stock: number;
  @Field(() => Float)
  price: number;
}

@InputType()
export class UpdateBatchInput {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  medicineId: number;
  @Field()
  manufactureDate: string;
  @Field()
  expirationDate: string;
  @Field(() => Int)
  stock: number;
  @Field(() => Float)
  price: number;
}
