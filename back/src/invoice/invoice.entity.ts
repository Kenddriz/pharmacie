import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Payment } from '../payment/payment.entity';

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

  @Field(() => Payment, { nullable: true })
  payment?: Payment;
  @Column({ default: 0 })
  paymentId: number;
}
