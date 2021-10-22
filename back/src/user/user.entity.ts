  import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ length: 15 })
  username: string;

  @Field()
  @Column({ length: 26, default: '' })
  avatar: string;

  @Field()
  @Column({ length: 60 })
  password: string;

  @Field()
  @CreateDateColumn({ type: 'date' })
  createdAt: string;

  @Field()
  @UpdateDateColumn({ type: 'date' })
  updatedAt: string;
}
