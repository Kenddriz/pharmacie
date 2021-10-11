import { Field, ObjectType } from '@nestjs/graphql';
import { Meta } from '../../shared/shared.dto';
import { Batch } from '../batch.entity';

@ObjectType()
export class BatchPaginationOutput {
  @Field(() => [Batch])
  items: Batch[];

  @Field(() => Meta)
  meta: Meta;
}
