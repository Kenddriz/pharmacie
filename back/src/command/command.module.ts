import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandResolver } from './command.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Command} from "./command.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Command])],
  providers: [CommandResolver, CommandService],
})
export class CommandModule {}
