import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { Batch } from '../batch/batch.entity';
import { Delivery } from '../delivery/delivery.entity';
import { Sale } from '../sale/sale.entity';

@ObjectType()
@Entity({ name: 'stock-movements' })
export class StockMovement {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field(() => Batch)
  @ManyToOne(() => Batch, (batch) => batch.stockMovements, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  batch: Batch;
  @RelationId((stockMovement: StockMovement) => stockMovement.batch)
  batchId: number;

  @Field(() => Delivery, { nullable: true })
  @ManyToOne(() => Delivery, (delivery) => delivery.stockMovements, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  delivery?: Delivery;
  @RelationId((stockMovement: StockMovement) => stockMovement.delivery)
  deliveryId: number;

  @Field(() => Sale, { nullable: true })
  @ManyToOne(() => Sale, (sale) => sale.stockMovements, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sale?: Sale;
  @RelationId((stockMovement: StockMovement) => stockMovement.sale)
  saleId: number;

  @Field()
  @Column({ type: 'int' })
  quantity: number;

  @Field()
  @Column({ type: 'float' })
  price: number;

  @Field()
  @Column({ type: 'float' })
  stock: number;

  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
