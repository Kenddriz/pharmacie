import { Field, ObjectType } from '@nestjs/graphql';
import { Meta } from '../../shared/shared.dto';
import { CommandLine } from '../command-line.entity';
import { Command } from '../../command/command.entity';

@ObjectType()
export class CommandLinePaginationOutput {
  @Field(() => [CommandLine])
  items: CommandLine[];

  @Field(() => Meta)
  meta: Meta;
}
@ObjectType()
export class SoftRemoveCommandLineOutput {
  @Field(() => Command)
  command: Command;
  @Field(() => CommandLine)
  commandLine: CommandLine;
}
