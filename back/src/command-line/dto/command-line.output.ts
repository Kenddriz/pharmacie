import { Field, ObjectType } from '@nestjs/graphql';
import { Meta } from '../../shared/shared.dto';
import { CommandLine } from '../command-line.entity';

@ObjectType()
export class CommandLinePaginationOutput {
  @Field(() => [CommandLine])
  items: CommandLine[];

  @Field(() => Meta)
  meta: Meta;
}
