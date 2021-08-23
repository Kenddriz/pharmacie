import { ObjectType, Field } from '@nestjs/graphql';
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Medicine } from '../medicine/medicine.entity';

@ObjectType()
@Entity({ name: 'dosages' })
export class Dosage {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ default: 0 })
  parentId: number;

  @Field()
  @Column()
  label: string;

  @OneToMany(() => Medicine, (medicine) => medicine.dosage, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  medicines: Medicine[];

  @Field({ nullable: true })
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt?: Date;
}
