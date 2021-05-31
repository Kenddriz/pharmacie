import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'forms' })
export class Form {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  label: string;
}
