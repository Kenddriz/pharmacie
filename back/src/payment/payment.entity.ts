import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
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
  paymentMode: PaymentMode;
  @Column()
  paymentModeId: number;

  @Field()
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updateAt' })
  updatedAt: Date;
}
