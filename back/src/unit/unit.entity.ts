import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'units' })
export class Unit {
  @Field(() => Int)
  @PrimaryColumn({ type: 'int', width: 2 })
  id: number;

  @Field()
  @Column({ length: 20, unique: true })
  label: string;

  @Field()
  @Column({ type: 'float', default: 1 })
  multiplicity: number;

  @Field()
  @Column({ length: 200 })
  description: string;

  @Field((type) => Int, { defaultValue: 0 })
  @Column({ name: 'parentId', type: 'int', width: 2 })
  parentId: number;
}
