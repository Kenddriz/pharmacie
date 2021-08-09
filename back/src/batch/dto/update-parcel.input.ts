import { CreateParcelInput } from './create-parcel.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateParcelInput extends PartialType(CreateParcelInput) {
  @Field(() => Int)
  id: number;
}
