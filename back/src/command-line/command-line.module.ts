import { Module } from '@nestjs/common';
import { CommandLineService } from './command-line.service';
import { CommandLineResolver } from './resolvers/command-line.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandLine } from './command-line.entity';
import { CommandLineFieldResolver } from './resolvers/command-line.field-resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CommandLine]), CommandLineModule],
  providers: [
    CommandLineResolver,
    CommandLineFieldResolver,
    CommandLineService,
  ],
  exports: [CommandLineService],
})
export class CommandLineModule {}
