import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class BatchFormInput {
  @Field(() => Int)
  medicineId: number;
  @Field()
  expirationDate: string;
  @Field(() => Int)
  currentStock: number;
}

@InputType()
export class UpdateBatchInput {
  @Field(() => Int)
  id: number;
  @Field(() => BatchFormInput)
  form: BatchFormInput;
}
