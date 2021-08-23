import { ObjectType, Field } from '@nestjs/graphql';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
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
  @ManyToOne(() => Payment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  payment?: Payment;

  @Field()
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
