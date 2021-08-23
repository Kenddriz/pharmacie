import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column, DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Sale } from '../sale/sale.entity';

@ObjectType()
@Entity({ name: 'prescriptions' })
export class Prescription {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  reference: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Patient)
  @ManyToOne(() => Patient, (patient) => patient.prescriptions, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  patient: Patient;
  @RelationId((prescription: Prescription) => prescription.patient)
  patientId: number;

  @OneToOne(() => Sale, (sale) => sale.prescription, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sale: Sale;

  @Field()
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
