import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Payment } from '../payment/payment.entity';
import {Command} from '../command/command.entity';

@ObjectType()
@Entity({ name: 'invoices' })
export class Invoice {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  reference: string; /**Reference of invoice from provider**/

  @Field()
  @Column({ type: 'date' })
  dueDate: string;

  @Field(() => Payment, { nullable: true })
  @OneToOne(() => Payment, { nullable: true })
  @JoinColumn({ name: 'payment_id', referencedColumnName: 'id' })
  payment?: Payment;
  @RelationId((invoice: Invoice) => invoice.payment)
  paymentId: number;

  @Field(() => Command, { nullable: true })
  @OneToOne(() => Command, { nullable: true })
  @JoinColumn({ name: 'command_id', referencedColumnName: 'id' })
  command: Command;
  @RelationId((invoice: Invoice) => invoice.command)
  commandId: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
