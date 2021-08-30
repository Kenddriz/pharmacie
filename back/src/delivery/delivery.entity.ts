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
import { StockMovement } from '../stock-movement/stock-movement.entity';

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
  invoice?: Invoice;

  @Field(() => [StockMovement])
  @OneToMany(() => StockMovement, (stockMovements) => stockMovements.delivery, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  stockMovements: StockMovement[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
