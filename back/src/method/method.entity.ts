import { ObjectType, Field } from '@nestjs/graphql';
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Payment } from '../payment/payment.entity';

@ObjectType()
@Entity({ name: 'methods' })
export class Method {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @OneToMany(() => Payment, (payment) => payment.method, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  payments: Payment[];

  @Field()
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
