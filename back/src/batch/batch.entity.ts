import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'batches' })
export class Batch {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  medicineId: number;

  @Field()
  @Column({ type: 'date' })
  manufactureDate: string;

  @Field()
  @Column({ type: 'date' })
  expirationDate: string;

  @Field()
  @Column({ type: 'int' })
  stock: string;
}
