import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Contact } from '../contact/Contact.entity';
import { Command } from '../command/command.entity';

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
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @Field(() => [Contact])
  contacts: Contact[];

  @Field(() => [Command])
  commands: Command[];
}
