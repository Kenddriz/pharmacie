import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CommandLineInput {
  @Field()
  medicineId: number;

  @Field()
  quantity: number;
}
@InputType()
export class AddCommandLineInput {
  @Field()
  commandId: number;
  @Field(() => CommandLineInput)
  commandLine: CommandLineInput;
}
@InputType()
export class UpdateCommandLineInput {
  @Field()
  id: string;
  @Field(() => CommandLineInput)
  commandLine: CommandLineInput;
}

@InputType()
export class DeleteCommandLineInput {
  @Field(() => String)
  commandLineId: string;

  @Field(() => Int)
  commandId: number;
}
