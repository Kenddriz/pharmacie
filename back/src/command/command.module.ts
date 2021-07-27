import { Global, Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandResolver } from './resolvers/command.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Command } from './command.entity';
import { CommandLineModule } from '../command-line/command-line.module';
import { CommandFieldResolver } from './resolvers/command.field-resolver';
import { ProviderModule } from '../provider/provider.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Command]), CommandLineModule],
  providers: [CommandResolver, CommandFieldResolver, CommandService],
  exports: [CommandService],
})
export class CommandModule {}
