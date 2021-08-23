import { ObjectType, Field } from '@nestjs/graphql';
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Method } from '../method/method.entity';

@ObjectType()
@Entity({ name: 'payments' })
export class Payment {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  reference: string;

  @Field(() => Method)
  @ManyToOne(() => Method, (method) => method.payments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  method: Method;

  @Field()
  @Column({ type: 'date' })
  date: string;

  @Field()
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
