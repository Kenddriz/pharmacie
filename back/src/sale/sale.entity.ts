import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { Prescription } from '../prescription/prescription.entity';

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
  prescription?: Prescription;
  @Column({ default: 0 })
  prescriptionId: number;
}
