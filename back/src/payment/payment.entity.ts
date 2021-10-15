import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { Method } from '../method/method.entity';
import { Invoice } from '../invoice/invoice.entity';

@ObjectType()
@Entity({ name: 'payments' })
export class Payment {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 25 })
  reference: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  note: string;

  @Field(() => Method)
  @ManyToOne(() => Method, (method) => method.payments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  method: Method;
  @RelationId((payment: Payment) => payment.method)
  methodId: number;

  @Field(() => Invoice)
  @OneToOne(() => Invoice, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  invoice: Invoice;

  @Field()
  @Column({ type: 'date' })
  date: string;

  @Field({ nullable: true })
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt?: Date;
}
