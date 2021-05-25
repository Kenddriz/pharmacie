import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Medicine} from '../medicine/medicine.entity';
import {Column, Entity, ManyToOne, PrimaryColumn, RelationId} from 'typeorm';
import {Unit} from '../unit/unit.entity';

@ObjectType()
@Entity({ name: 'quantities'})
export class Quantity {

  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field(() => Medicine)
  @ManyToOne(() => Medicine)
  medicine: Medicine;
  @RelationId((quantity: Quantity) => quantity.medicine)
  medicineId: number;

  @Field()
  @Column({ type: 'float' })
  stock: number;

  @Field()
  @Column({ type: 'float' })
  shop: number;

  @Field()
  @Column({ type: 'float' })
  price: number;

  @Field(() => Unit)
  @ManyToOne(() => Unit)
  unit: Unit;
  @RelationId((quantity: Quantity) => quantity.unit)
  unitId: number;
}
