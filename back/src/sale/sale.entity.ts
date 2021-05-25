import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'Sales' })
export class Sale {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
