import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Batch } from '../batch/batch.entity';

@ObjectType()
@Entity({ name: 'assureLines' })
export class AssuredLine {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  deliveryId: number;

  @Field()
  @Column({ type: 'date' })
  expirationDate: string;

  @Field()
  @Column()
  quantity: number;

  @Field(() => [Batch])
  batches: Batch[];
  @Column()
  batchId: number;
}
