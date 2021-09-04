import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateDeliveryInput {
  @Field(() => Int)
  id: number;
}
