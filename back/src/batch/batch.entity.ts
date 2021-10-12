import { ObjectType, Field, Float } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Medicine } from '../medicine/medicine.entity';
import { StockMovement } from '../stock-movement/stock-movement.entity';

@ObjectType()
@Entity({ name: 'batches' })
export class Batch {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field(() => Medicine)
  @ManyToOne(() => Medicine, (medicine) => medicine.batches, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  medicine: Medicine;
  @RelationId((batch: Batch) => batch.medicine)
  medicineId: number;

  @Field(() => [StockMovement])
  @OneToMany(() => StockMovement, (stockMovement) => stockMovement.batch, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  stockMovements: StockMovement[];

  @Field()
  @Column({ type: 'date' })
  expirationDate: string;
  /*current stock should be saved to have always access on it, even if some movement are deleted**/
  @Field(() => Float, { defaultValue: 0 })
  @Column({ type: 'float', default: 0 })
  currentStock: number;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt?: Date;
}
