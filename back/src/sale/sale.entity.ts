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
import { SaleLine } from '../sale-line/sale-line.entity';

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

  @Field(() => [SaleLine])
  @OneToMany(() => SaleLine, (saleLine) => saleLine.batches, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  saleLines: SaleLine[];

  @Field()
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
