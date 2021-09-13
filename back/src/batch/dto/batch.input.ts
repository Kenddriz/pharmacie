import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class BatchFormInput {
  @Field(() => Int)
  medicineId: number;
  @Field()
  expirationDate: string;
  @Field(() => Int, { nullable: true })
  currentStock?: number;
}

@InputType()
export class UpdateBatchInput {
  @Field(() => Int)
  id: number;
  @Field(() => BatchFormInput)
  form: BatchFormInput;
}
@InputType()
export class FindExistingBatchInput {
  @Field()
  medicineId: number;
  @Field()
  expirationDate: string;
}
