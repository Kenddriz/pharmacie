import { ObjectType, Field } from '@nestjs/graphql';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Prescription } from '../prescription/prescription.entity';
import { StockMovement } from '../stock-movement/stock-movement.entity';

@ObjectType()
@Entity({ name: 'sales' })
export class Sale {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field(() => Prescription, { nullable: true })
  @OneToOne(() => Prescription, (prescription) => prescription.sale, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  prescription?: Prescription;

  @Field(() => [StockMovement])
  @OneToMany(() => StockMovement, (stockMovement) => stockMovement.sale, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  stockMovements: StockMovement[];

  @Field({ nullable: true })
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt?: Date;
}
