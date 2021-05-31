import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { MedicineForm } from '../medicine-form/medicine-form.entity';

@ObjectType()
@Entity({ name: 'medicines' })
export class Medicine {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ length: 100, unique: true })
  designation: string;

  @Field()
  @Column({ type: 'date' })
  expiration: string;

  @Field(() => [MedicineForm])
  medicineForms: MedicineForm[];
}
