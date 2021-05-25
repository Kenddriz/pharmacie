import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Unit} from '../unit/unit.entity';
import {Entity, JoinColumn, ManyToOne, PrimaryColumn, RelationId} from 'typeorm';
import {Medicine} from '../medicine/medicine.entity';

@ObjectType()
@Entity({ name: 'command_lines'})
export class CommandLine {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field(() => Unit)
  @ManyToOne(() => Unit)
  @JoinColumn({ name: 'unit_id', referencedColumnName: 'id' })
  unit: Unit;
  @RelationId((commandLine: CommandLine) => commandLine.unit)
  unitId: number;

  @Field(() => Medicine)
  @ManyToOne(() => Medicine)
  @JoinColumn({ name: 'medicine_id', referencedColumnName: 'id' })
  medicine: Medicine;
  @RelationId((commandLine: CommandLine) => commandLine.medicine)
  medicineId: number;
}
