import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Prescription } from '../prescription/prescription.entity';

@ObjectType()
@Entity({ name: 'patients' })
export class Patient {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  phone: string;

  @Field(() => [Prescription])
  prescriptions: Prescription[];
}
