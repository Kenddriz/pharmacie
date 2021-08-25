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
  date: string;

  @Field(() => Prescription, { nullable: true })
  @OneToOne(() => Prescription, (prescription) => prescription.sale, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  prescription?: Prescription;
  @RelationId((sale: Sale) => sale.prescription)
  prescriptionId: number;

  @Field(() => [StockMovement])
  @OneToMany(() => StockMovement, (stockMovement) => stockMovement.sale, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  stockMovements: StockMovement[];

  @Field()
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
