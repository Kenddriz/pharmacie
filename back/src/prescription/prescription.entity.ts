import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Patient } from '../patient/patient.entity';

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
  patient: Patient;
  @Column()
  patientId: number;
}
