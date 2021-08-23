import { ObjectType, Field } from '@nestjs/graphql';
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, RelationId } from 'typeorm';
import { Medicine } from '../medicine/medicine.entity';
import { Command } from '../command/command.entity';

@ObjectType()
@Entity({ name: 'command-lines' })
export class CommandLine {
  @Field()
  @PrimaryColumn()
  id: number;

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
  @RelationId((commandLine: CommandLine) => commandLine.command)
  commandId: number;

  @Field()
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;
}
