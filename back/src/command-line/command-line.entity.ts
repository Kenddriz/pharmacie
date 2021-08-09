import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Medicine } from '../medicine/medicine.entity';

@ObjectType()
@Entity({ name: 'command-lines' })
export class CommandLine {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  commandId: number;

  @Field()
  @Column()
  quantity: number;

  @Field(() => [Medicine])
  medicines: Medicine[];
  @Column()
  medicineId: number;
}
