import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Contact } from '../contact/Contact.entity';

@ObjectType()
@Entity({ name: 'providers' })
export class Provider {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ length: 60 })
  name: string;

  @Field()
  @Column({ length: 60, default: '' })
  address: string;

  @Field()
  @Column({ length: 60, default: '' })
  logo: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => [Contact])
  contacts: Contact[];
}
