import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'methods' })
export class Method {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  label: number;
}
