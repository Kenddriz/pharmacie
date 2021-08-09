import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'sale-lines' })
export class SaleLine {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  saleId: number;

  @Field()
  @Column()
  quantity: number;
}
