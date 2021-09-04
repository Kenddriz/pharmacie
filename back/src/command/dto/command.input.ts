import { InputType, Field } from '@nestjs/graphql';
import { CommandLineInput } from '../../command-line/dto/command-line.input';

@InputType()
export class CreateCommandInput {
  @Field()
  providerId: number;
  @Field(() => [CommandLineInput])
  commandLines: CommandLineInput[];
}
@InputType()
export class UpdateCommandInput {
  @Field()
  id: number;
  @Field()
  providerId: number;
}
