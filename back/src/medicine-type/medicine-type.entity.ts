import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'medicine-types' })
export class MedicineType {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  label: number;
}
