import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateQuantityInput {

  @Field(() => Int)
  unitId: number;

  @Field(() => Int)
  value: number;

  @Field(() => Int)
  price: number;
}
