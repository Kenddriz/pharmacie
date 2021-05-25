import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMedicineTypeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
