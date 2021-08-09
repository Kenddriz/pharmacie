import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
