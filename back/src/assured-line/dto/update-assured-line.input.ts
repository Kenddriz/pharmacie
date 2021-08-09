import { CreateAssuredLineInput } from './create-assured-line.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAssuredLineInput extends PartialType(CreateAssuredLineInput) {
  @Field(() => Int)
  id: number;
}
