import {InputType, Field, Int, PartialType} from '@nestjs/graphql';
import {CreateQuantityInput} from '../../quantity/types/quantity.input';

@InputType()
export class CreateMedicineInput {
  @Field()
  designation: string;

  @Field()
  expiration: string;

  @Field()
  vat: number;

  @Field()
  type: string;

  @Field(() => [CreateQuantityInput])
  quantities: CreateQuantityInput[]
}

@InputType()
export class UpdateMedicineInput extends PartialType(CreateMedicineInput) {
  @Field(() => Int)
  id: number;
}
