import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'forms' })
export class Form {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  label: number;
}
