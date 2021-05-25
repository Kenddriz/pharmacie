import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { MedicineType } from '../medicine-type/medicine-type.entity';
import {Quantity} from "../quantity/quantity.entity";

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

  @Field()
  @Column({ type: 'float' })
  vat: number;

  @Field(() => MedicineType)
  @ManyToOne(() => MedicineType)
  @JoinColumn({ name: 'type_id', referencedColumnName: 'id' })
  type: MedicineType;
  @RelationId((medicine: Medicine) => medicine.type)
  typeId: number;

  @Field(() => [Quantity])
  quantities: Quantity[];
}
