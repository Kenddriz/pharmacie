import { ObjectType, Field } from '@nestjs/graphql';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { Provider } from '../provider/provider.entity';
import { CommandLine } from '../command-line/command-line.entity';
import { Invoice } from '../invoice/invoice.entity';

@ObjectType()
@Entity({ name: 'commands' })
export class Command {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field(() => Invoice, { nullable: true })
  @OneToOne(() => Invoice, (invoice) => invoice.command, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  invoice?: Invoice;

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
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt?: Date;
}
