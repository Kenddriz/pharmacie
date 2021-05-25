import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentMode } from '../payment-mode/payment-mode.entity';

@ObjectType()
@Entity({ name: 'payments' })
export class Payment {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  reference: string; /**reference from payment mode**/

  @Field()
  @Column({ length: 100 })
  description: string;

  @Field()
  @Column({ type: 'date' })
  date: string;

  @Field(() => PaymentMode)
  @ManyToOne(() => PaymentMode)
  @JoinColumn({ name: 'payment_mode_id', referencedColumnName: 'id' })
  paymentMode: PaymentMode;
  @RelationId((payment: Payment) => payment.paymentMode)
  paymentModeId: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
