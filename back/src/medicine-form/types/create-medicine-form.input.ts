import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMedicineFormInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
