import { PrescriptionInput } from './prescription.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePrescriptionInput extends PartialType(PrescriptionInput) {
  @Field(() => Int)
  id: number;
}
