import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Contact } from './types/provider.dto';

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

  @Field({ defaultValue: '' })
  logo: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
