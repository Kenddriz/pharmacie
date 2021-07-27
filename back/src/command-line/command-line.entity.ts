import { ObjectType, Field } from '@nestjs/graphql';
import { Unit } from '../unit/unit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Form } from '../form/form.entity';
import { Command } from '../command/command.entity';

@ObjectType()
@Entity({ name: 'command_lines' })
export class CommandLine {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Unit)
  unit: Unit;
  @Column()
  unitId: number;

  @Field()
  @Column({ default: 0 })
  quantity: number;

  @Field()
  @Column({ default: 0 })
  price: number;

  @Field()
  @Column()
  medicine: string;

  @Field(() => Form)
  form: Form;
  @Column()
  formId: number;

  @ManyToOne(() => Command)
  @JoinColumn({ name: 'commandId' })
  command: Command;
  @Field()
  @RelationId((commandLine: CommandLine) => commandLine.command)
  commandId: number;

  @Field()
  @Column({ default: 0 })
  vat: number;
}
