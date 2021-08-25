import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CommandLineInput {
  @Field()
  medicine: string;

  @Field()
  quantity: number;

  @Field()
  vat: number;
}
@InputType()
export class AddCommandLineInput {
  @Field()
  commandId: number;
  @Field(() => [CommandLineInput])
  commandLines: CommandLineInput[];
}
