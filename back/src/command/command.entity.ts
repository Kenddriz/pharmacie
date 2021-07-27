import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Provider } from '../provider/provider.entity';
import { CommandLine } from '../command-line/command-line.entity';

@ObjectType()
@Entity({ name: 'commands' })
export class Command {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field(() => Provider)
  provider: Provider;
  @Column()
  providerId: number;

  @Field()
  @Column({ default: false })
  arrived: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [CommandLine])
  commandLines: CommandLine[];
}
