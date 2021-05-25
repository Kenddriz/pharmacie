import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Column, Entity, ManyToOne, PrimaryColumn, RelationId} from 'typeorm';
import {ContactType} from '../contact-type/contact-type.entity';
import {Provider} from '../provider/provider.entity';

@ObjectType()
@Entity({ name: 'contacts' })
export class Contact {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ length: 60, unique: true })
  label: string;

  @ManyToOne(() => ContactType)
  contactType: ContactType
  @RelationId((contact: Contact) => contact.contactType)
  contactTypeId: number;

  @ManyToOne(() => Provider)
  provider: Provider
  @RelationId((contact: Contact) => contact.provider)
  providerId: number;
}
