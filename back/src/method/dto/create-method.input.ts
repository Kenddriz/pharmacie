import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMethodInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
