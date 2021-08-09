import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
