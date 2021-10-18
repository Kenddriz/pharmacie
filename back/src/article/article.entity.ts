import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Medicine } from '../medicine/medicine.entity';

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
  commercialName: string;

  @Field(() => [Medicine])
  @OneToMany(() => Medicine, (medicine) => medicine.article, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  medicines: Medicine[];

  @Field()
  @CreateDateColumn()
  updatedAt: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt?: Date;
}
