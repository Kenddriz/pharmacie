import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
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
  method: Method;
  @Column()
  methodId: string;

  @Field()
  @Column({ type: 'date' })
  date: string;
}
