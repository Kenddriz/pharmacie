import { CreatePatientInput } from './create-patient.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientInput extends PartialType(
  OmitType(CreatePatientInput, ['exampleField'] as const),
) {
  @Field(() => Int)
  id: number;
}
