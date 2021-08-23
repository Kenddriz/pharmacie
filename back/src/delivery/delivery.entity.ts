import { ObjectType, Field } from '@nestjs/graphql';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { Command } from '../command/command.entity';
import { Invoice } from '../invoice/invoice.entity';
import { AssuredLine } from '../assured-line/assured-line.entity';

@ObjectType()
@Entity({ name: 'deliveries' })
export class Delivery {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field(() => Command)
  @OneToOne(() => Command, (command) => command.delivery, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  command: Command;
  @RelationId((delivery: Delivery) => delivery.command)
  commandId: number;

  @Field(() => Invoice, { nullable: true })
  @OneToOne(() => Invoice, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  invoice?: Invoice;
  @RelationId((delivery: Delivery) => delivery.invoice)
  invoiceId: number;

  @Field(() => [AssuredLine])
  @OneToMany(() => AssuredLine, (assuredLine) => assuredLine.delivery, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  assuredLines: AssuredLine[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
