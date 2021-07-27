import { InputType, Field, Int } from '@nestjs/graphql';
import { CreateMedicineFormInput } from '../../medicine-form/types/medicine.form.input';

@InputType()
export class CreateMedicineInput {
  @Field()
  designation: string;

  @Field(() => [CreateMedicineFormInput])
  medicineForms: CreateMedicineFormInput[];
}
@InputType()
export class UpdateMedicineInput {
  @Field(() => Int)
  id: number;
  @Field()
  designation: string;
}
