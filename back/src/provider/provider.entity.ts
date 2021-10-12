import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Contact } from './types/provider.dto';
import { Command } from '../command/command.entity';

@ObjectType()
@Entity({ name: 'providers' })
export class Provider {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Contact])
  @Column({ type: 'jsonb' })
  contacts: Contact[];

  @Field()
  @Column()
  address: string;

  @Field()
  @Column({ length: 25, default: '' })
  avatar: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Field(() => [Command])
  @OneToMany(() => Command, (command) => command.provider, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  commands: Command[];

  @Field({ nullable: true })
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt?: Date;
}
