import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  RelationId,
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
  manufactureDate: string;

  @Field()
  @Column({ type: 'date' })
  expirationDate: string;

  @Field()
  @Column({ type: 'int' })
  stock: number;

  @Field()
  @Column({ type: 'float' })
  price: number;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
