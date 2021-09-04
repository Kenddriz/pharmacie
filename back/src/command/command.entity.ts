import { ObjectType, Field } from '@nestjs/graphql';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { Delivery } from '../delivery/delivery.entity';
import { Provider } from '../provider/provider.entity';
import { CommandLine } from '../command-line/command-line.entity';

@ObjectType()
@Entity({ name: 'commands' })
export class Command {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field(() => Delivery, { nullable: true })
  @OneToOne(() => Delivery, (delivery) => delivery.command, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  delivery?: Delivery;

  @Field(() => [CommandLine], { nullable: true })
  @OneToMany(() => CommandLine, (commandLine) => commandLine.command, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  commandLines: CommandLine[];

  @Field(() => Provider)
  @ManyToOne(() => Provider, (provider) => provider.commands, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  provider: Provider;
  @RelationId((command: Command) => command.provider)
  providerId: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
