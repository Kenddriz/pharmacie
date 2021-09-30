import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Prescription } from '../prescription/prescription.entity';

@ObjectType()
@Entity({ name: 'patients' })
export class Patient {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  phone: string;

  @Field(() => [Prescription])
  @OneToMany(() => Prescription, (prescription) => prescription.patient, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  prescriptions: Prescription[];

  @Field()
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
