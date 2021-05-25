import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { Sale } from '../sale/sale.entity';
import { Medicine } from '../medicine/medicine.entity';
import {Unit} from '../unit/unit.entity';

@ObjectType()
@Entity({ name: 'sales_line' })
export class SalesLine {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ type: 'float' })
  unitPrice: number; /** vat where medicine is sold  **/

  @Field()
  @Column({ type: 'int', width: 4 })
  quantity: number; /** number of something sold **/

  @Field()
  @Column({ type: 'float' })
  vat: number; /** vat where medicine is sold  **/

  @Field(() => Sale)
  @ManyToOne(() => Sale)
  @JoinColumn({ name: 'sale_id', referencedColumnName: 'id' })
  sale: Sale;
  @RelationId((salesLine: SalesLine) => salesLine.sale)
  saleId: number;

  @Field(() => Medicine)
  @ManyToOne(() => Medicine)
  @JoinColumn({ name: 'medicine_id', referencedColumnName: 'id' })
  medicine: Medicine;
  @RelationId((salesLine: SalesLine) => salesLine.medicine)
  medicineId: number;

  @Field(() => Unit)
  @ManyToOne(() => Unit)
  @JoinColumn({ name: 'unit_id', referencedColumnName: 'id' })
  unit: Unit;
  @RelationId((salesLine: SalesLine) => salesLine.unit)
  unitId: number;
}
