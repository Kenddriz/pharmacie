import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CommandLineInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  medicine: string;

  @Field()
  unitId: number;

  @Field()
  price: number;

  @Field()
  quantity: number;

  @Field()
  formId: number;

  @Field()
  vat: number;
}
@InputType()
export class CreateOrUpdateCommandLineInput {
  @Field()
  commandId: number;
  @Field(() => [CommandLineInput])
  commandLines: CommandLineInput[];
}
