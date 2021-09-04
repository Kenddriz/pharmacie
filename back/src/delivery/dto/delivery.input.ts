import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class AssuredLineFormInput {
  @Field()
  medicineId: number;
  @Field(() => Float)
  price: number;
  @Field()
  expirationDate: string;
  @Field(() => Float)
  vat: number;
  @Field()
  quantity: number;
}
@InputType()
export class CreateDeliveryInput {
  @Field(() => Int)
  commandId: number;
  @Field(() => [AssuredLineFormInput])
  forms: AssuredLineFormInput[];
}
