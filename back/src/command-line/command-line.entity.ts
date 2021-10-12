import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Medicine } from '../medicine/medicine.entity';
import { Command } from '../command/command.entity';

@ObjectType()
@Entity({ name: 'commandLines' })
export class CommandLine {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  quantity: number;

  @Field(() => Medicine)
  @ManyToOne(() => Medicine, (medicine) => medicine.commandLines, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  medicine: Medicine;
  @RelationId((commandLine: CommandLine) => commandLine.medicine)
  medicineId: number;

  @Field(() => Command)
  @ManyToOne(() => Command, (command) => command.commandLines, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  command: Command;
  @Field()
  @RelationId((commandLine: CommandLine) => commandLine.command)
  commandId: number;

  @Field({ nullable: true })
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt?: Date;
}
