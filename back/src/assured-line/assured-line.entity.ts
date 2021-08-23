import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, RelationId } from 'typeorm';
import { Batch } from '../batch/batch.entity';
import { Delivery } from '../delivery/delivery.entity';

@ObjectType()
@Entity({ name: 'assureLines' })
export class AssuredLine {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field(() => Delivery)
  @ManyToOne(() => Delivery, (delivery) => delivery.assuredLines, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  delivery: Delivery;
  @RelationId((assuredLine: AssuredLine) => assuredLine.delivery)
  deliveryId: number;

  @Field()
  @Column({ type: 'date' })
  expirationDate: string;

  @Field()
  @Column()
  quantity: number;

  @Field(() => Batch)
  @ManyToOne(() => Batch, (batch) => batch.assuredLines, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  batch: Batch;
  @RelationId((assuredLine: AssuredLine) => assuredLine.batch)
  batchId: number;

  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
