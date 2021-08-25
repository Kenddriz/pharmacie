import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { Command } from '../command.entity';
import { Meta } from '../../shared/shared.dto';

@InputType()
export class CommandDto {
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class CommandPagination {
  @Field(() => [Command])
  items: Command[];

  @Field(() => Meta)
  meta: Meta;
}
