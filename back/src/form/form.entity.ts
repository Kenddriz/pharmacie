import { ObjectType, Field } from '@nestjs/graphql';
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Medicine } from '../medicine/medicine.entity';

@ObjectType()
@Entity({ name: 'forms' })
export class Form {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @OneToMany(() => Medicine, (medicine) => medicine.form, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  medicines: Medicine[];

  @Field({ nullable: true })
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt?: Date;
}
