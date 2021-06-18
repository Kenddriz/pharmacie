import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryColumn, RelationId } from 'typeorm';
import { Medicine } from '../medicine/medicine.entity';
import { Form } from '../form/form.entity';
import { Unit } from '../unit/unit.entity';

@ObjectType()
@Entity({ name: 'medicine-forms' })
export class MedicineForm {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ type: 'date' })
  expiration: string;

  @Field()
  @Column({ type: 'float', default: 0 })
  vat: number;

  @Field()
  @Column({ type: 'float', default: 0 })
  stock: number;

  @Field()
  @Column({ type: 'float', default: 0 })
  shop: number;

  @Field()
  @Column({ type: 'float', default: 0 })
  price: number;

  @ManyToOne(() => Medicine)
  medicine: Medicine;
  @RelationId((med: MedicineForm) => med.medicine)
  medicineId: number;

  @ManyToOne(() => Unit)
  unit: Unit;
  @RelationId((med: MedicineForm) => med.unit)
  unitId: number;

  @ManyToOne(() => Form)
  form: Form;
  @RelationId((med: MedicineForm) => med.form)
  formId: number;
}
