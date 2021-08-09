import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { Command } from '../command/command.entity';
import { Invoice } from '../invoice/invoice.entity';

@ObjectType()
@Entity({ name: 'deliveries' })
export class Delivery {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field(() => Command)
  command: Command;
  @Column()
  commandId: number;

  @Field(() => Invoice)
  invoice: Invoice;
  @Column({ default: 0 })
  invoiceId: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
