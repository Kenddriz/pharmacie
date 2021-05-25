import { CreateMedicineTypeInput } from './create-medicine-type.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMedicineTypeInput extends PartialType(CreateMedicineTypeInput) {
  @Field(() => Int)
  id: number;
}
