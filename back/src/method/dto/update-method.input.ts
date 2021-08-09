import { CreateMethodInput } from './create-method.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMethodInput extends PartialType(CreateMethodInput) {
  @Field(() => Int)
  id: number;
}
