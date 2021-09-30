import { InputType, Field, Int } from '@nestjs/graphql';
import { CreatePatientInput } from '../../patient/dto/patient.input';

@InputType()
export class PrescriptionInput {
  @Field()
  reference: string;
  @Field()
  description: string;
  @Field(() => CreatePatientInput)
  patient: CreatePatientInput;
}

@InputType()
export class CreatePrescriptionInput extends PrescriptionInput {
  @Field()
  saleId: number;
}

@InputType()
export class UpdatePrescriptionInput extends PrescriptionInput {
  @Field()
  id: number;
}

@InputType()
export class DeletePrescriptionInput {
  @Field()
  id: number;
  @Field()
  saleId: number;
}
