import { Global, Module } from '@nestjs/common';
import { CommandLineService } from './command-line.service';
import { CommandLineResolver } from './command-line.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandLine } from './command-line.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CommandLine])],
  providers: [CommandLineResolver, CommandLineService],
  exports: [CommandLineService],
})
export class CommandLineModule {}
