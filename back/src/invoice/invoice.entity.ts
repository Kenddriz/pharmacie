import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Payment } from '../payment/payment.entity';
import { Command } from '../command/command.entity';

@ObjectType()
@Entity({ name: 'invoices' })
export class Invoice {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  reference: string; /**Reference of invoice from provider**/

  @Field()
  @Column({ type: 'date' })
  dueDate: string;

  @Field(() => Payment, { nullable: true })
  payment?: Payment;
  @Column({ default: 0 })
  paymentId: number;

  @Field(() => Command)
  command: Command;
  @Field()
  @Column()
  commandId: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
