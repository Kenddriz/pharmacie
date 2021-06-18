import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateMedicineFormInput } from '../../medicine-form/types/medicine.form.input';

@InputType()
export class CreateMedicineInput {
  @Field()
  designation: string;

  @Field(() => [CreateMedicineFormInput])
  medicineForms: CreateMedicineFormInput[];
}

@InputType()
export class UpdateMedicineInput extends PartialType(CreateMedicineInput) {
  @Field(() => Int)
  id: number;
}
