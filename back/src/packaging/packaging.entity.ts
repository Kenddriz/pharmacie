import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Medicine } from '../medicine/medicine.entity';

@ObjectType()
export class Unit {
  @Field()
  label: string;
  @Field()
  multiplicity: number;
}

@ObjectType()
@Entity({ name: 'packaging' })
export class Packaging {
  @Field()
  @PrimaryColumn({ type: 'int', width: 2 })
  id: number;

  @Field(() => [Unit])
  @Column({ type: 'jsonb' })
  units: Unit[];

  @OneToMany(() => Medicine, (medicine) => medicine.packaging, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  medicines: Medicine[];

  @Field({ nullable: true })
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt?: Date;
}
