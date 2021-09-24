import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePatientInput {
  @Field(() => Int)
  id: number;
}
