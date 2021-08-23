import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne, OneToMany,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { Medicine } from '../medicine/medicine.entity';
import { AssuredLine } from '../assured-line/assured-line.entity';
import { SaleLine } from '../sale-line/sale-line.entity';

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

  @Field(() => [AssuredLine])
  @OneToMany(() => AssuredLine, (assuredLine) => assuredLine.batch, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  assuredLines: AssuredLine[];

  @Field(() => [SaleLine])
  @OneToMany(() => SaleLine, (saleLine) => saleLine.batches, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  saleLines: SaleLine[];

  @Field()
  @Column({ type: 'date' })
  manufactureDate: string;

  @Field()
  @Column({ type: 'date' })
  expirationDate: string;

  @Field()
  @Column({ type: 'int' })
  stock: string;

  @Field()
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
