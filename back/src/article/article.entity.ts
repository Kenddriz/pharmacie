import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'articles' })
export class Article {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  dci: string;

  @Field()
  @Column()
  commercial_name: string;
}
