import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { Payment } from '../payment/payment.entity';
import { Delivery } from '../delivery/delivery.entity';

@ObjectType()
@Entity({ name: 'invoices' })
export class Invoice {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ type: 'date' })
  date: number;

  @Field()
  @Column({ type: 'date' })
  dueDate: number;

  @Field()
  @Column({ type: 'float', default: 0 })
  discount: number;

  @Field(() => Payment, { nullable: true })
  @OneToOne(() => Payment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  payment?: Payment;
  @RelationId((invoice: Invoice) => invoice.payment)
  paymentId: number;

  @Field(() => Delivery)
  @OneToOne(() => Delivery, (delivery) => delivery.invoice, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  delivery: Delivery;
  @RelationId((invoice: Invoice) => invoice.delivery)
  deliveryId: number;

  @Field()
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
