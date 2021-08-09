import { ObjectType, Field } from '@nestjs/graphql';
import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { Delivery } from '../delivery/delivery.entity';

@ObjectType()
@Entity({ name: 'commands' })
export class Command {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Delivery, { nullable: true })
  delivery?: Delivery;
}
