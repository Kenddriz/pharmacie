import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class MethodInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  label: string;
}
