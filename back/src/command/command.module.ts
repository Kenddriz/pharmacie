import { Global, Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandResolver } from './command.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Command } from './command.entity';
import { ProviderModule } from '../provider/provider.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Command]), ProviderModule],
  providers: [CommandResolver, CommandService],
  exports: [CommandService],
})
export class CommandModule {}
