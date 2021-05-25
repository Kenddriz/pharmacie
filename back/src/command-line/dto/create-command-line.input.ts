import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommandLineInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
