import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePatientInput {
  @Field(() => Int, { nullable: true })
  id: number;
  @Field()
  name: string;
  @Field()
  phone: string;
}
