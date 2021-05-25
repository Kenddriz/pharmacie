import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column, Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { Provider } from '../provider/provider.entity';

@ObjectType()
@Entity({ name: 'commands' })
export class Command {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field(() => Provider)
  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id', referencedColumnName: 'id' })
  provider: Provider;
  @RelationId((command: Command) => command.provider)
  providerId: number;

  @Field()
  @Column({ default: 0 })
  vat: number;

  @Field()
  @Column({ default: false })
  arrived: boolean;
}
