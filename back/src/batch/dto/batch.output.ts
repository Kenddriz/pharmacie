import { Field, ObjectType } from '@nestjs/graphql';
import { Meta } from '../../shared/shared.dto';
import { Batch } from '../batch.entity';
import { Medicine } from '../../medicine/medicine.entity';

@ObjectType()
export class BatchPaginationOutput {
  @Field(() => [Batch])
  items: Batch[];

  @Field(() => Meta)
  meta: Meta;
}
@ObjectType()
export class SoftRemoveBatchOutput {
  @Field(() => Batch)
  batch: Batch;
  @Field(() => Medicine)
  medicine: Medicine;
}
