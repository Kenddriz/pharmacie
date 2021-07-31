import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'measures' })
export class Measure {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field(() => [Measure])
  children: Measure[];
  @Field()
  @Column({ default: 0 })
  parentId: number;

  @Field()
  @Column({ unique: true })
  label: string;
}
