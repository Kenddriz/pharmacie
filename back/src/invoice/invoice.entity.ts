import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { Payment } from '../payment/payment.entity';
import { Command } from '../command/command.entity';
import { StockMovement } from '../stock-movement/stock-movement.entity';

@ObjectType()
@Entity({ name: 'invoices' })
export class Invoice {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ type: 'date' })
  deliveryDate: string;

  @Field()
  @Column({ type: 'date' })
  dueDate: string;

  @Field(() => Payment, { nullable: true })
  @OneToOne(() => Payment, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  payment?: Payment;
  @RelationId((invoice: Invoice) => invoice.payment)
  paymentId: number;

  @Field(() => Command)
  @OneToOne(() => Command, (command) => command.invoice, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  command: Command;
  @RelationId((invoice: Invoice) => invoice.command)
  commandId: number;

  @Field(() => [StockMovement])
  @OneToMany(() => StockMovement, (stockMovements) => stockMovements.invoice, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  stockMovements: StockMovement[];

  @Field()
  @Column({ default: 0, type: 'float' })
  expense: number;

  @Field()
  @Column()
  reference: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt?: Date;
}
