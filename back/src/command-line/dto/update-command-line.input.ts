import { CreateCommandLineInput } from './create-command-line.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCommandLineInput extends PartialType(CreateCommandLineInput) {
  @Field(() => Int)
  id: number;
}
