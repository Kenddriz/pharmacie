import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Sale } from '../sale/sale.entity';

@ObjectType()
@Entity({ name: 'prescription' })
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

  @Field(() => Sale)
  @OneToOne(() => Sale, (sale) => sale.prescription, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  sale: Sale;
  @RelationId((prescription: Prescription) => prescription.sale)
  saleId: number;

  @Field()
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
