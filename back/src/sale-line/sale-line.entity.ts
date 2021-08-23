import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Batch } from '../batch/batch.entity';
import { Sale } from '../sale/sale.entity';

@ObjectType()
@Entity({ name: 'saleLines' })
export class SaleLine {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  saleId: number;

  @Field()
  @Column()
  quantity: number;

  @Field(() => Batch)
  @ManyToOne(() => Batch, (batch) => batch.saleLines, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  batches: Batch;

  @Field(() => Sale)
  @ManyToOne(() => Sale, (sale) => sale.saleLines, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sales: Sale;

  @Field()
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
