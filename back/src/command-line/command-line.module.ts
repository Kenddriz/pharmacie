import { Module } from '@nestjs/common';
import { CommandLineService } from './command-line.service';
import { CommandLineResolver } from './command-line.resolver';

@Module({
  providers: [CommandLineResolver, CommandLineService]
})
export class CommandLineModule {}
