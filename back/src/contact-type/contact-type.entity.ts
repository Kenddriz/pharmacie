import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Column, Entity, PrimaryColumn} from 'typeorm';
import {Contact} from '../contact/Contact.entity';

@ObjectType()
@Entity({ name: 'contact_types' })
export class ContactType {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ length: 12, unique: true })
  label: string;

  @Field(() => [Contact])
  contacts: Contact[];
}
