import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'payment_modes' })
export class PaymentMode {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  label: string;
}
