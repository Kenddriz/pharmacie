import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Batch } from '../batch/batch.entity';
import { Sale } from '../sale/sale.entity';
import { Invoice } from '../invoice/invoice.entity';

@ObjectType()
@Entity({ name: 'stockMovements' })
export class StockMovement {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => Batch)
  @ManyToOne(() => Batch, (batch) => batch.stockMovements, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  batch: Batch;
  @RelationId((stockMovement: StockMovement) => stockMovement.batch)
  batchId: number;

  @Field(() => Invoice, { nullable: true })
  @ManyToOne(() => Invoice, (invoice) => invoice.stockMovements, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  invoice?: Invoice;
  @RelationId((stockMovement: StockMovement) => stockMovement.invoice)
  invoiceId: number;

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
  quantity: number; /**purchase or sale quantity**/

  @Field()
  @Column({ type: 'float' })
  price: number; /**purchase or sale price**/

  @Field()
  @Column({ type: 'float' })
  stock: number; /**stock variation**/

  @Field()
  @Column({ type: 'float', default: 0 })
  discount: number;

  @Field()
  @Column({ type: 'float', default: 0 })
  vat: number; /**purchase or sale vat variation**/

  @Field(() => [StockMovement])
  out: StockMovement[]; /**purchase or sale vat variation**/

  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
