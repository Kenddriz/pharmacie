import { InputType, Field, Int } from '@nestjs/graphql';
import { CommandLineInput } from '../../command-line/dto/command-line.input';
import { PaginationInput } from '../../shared/shared.input';

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
@InputType()
export class ProviderCommandsInput {
  @Field(() => Int)
  year: number;
  @Field(() => Int)
  providerId: number;
}

@InputType()
export class PaginateProviderCommandsInput extends PaginationInput {
  @Field(() => ProviderCommandsInput, { nullable: true })
  providerInput?: ProviderCommandsInput;
}
