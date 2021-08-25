import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CommandLine } from './command-line.entity';
import { CommandService } from '../command/command.service';
import { CommandLineService } from './command-line.service';
import { Command } from '../command/command.entity';
import { AddCommandLineInput } from './dto/command-line.input';

@Resolver(() => CommandLine)
export class CommandLineResolver {
  constructor(
    private commandService: CommandService,
    private commandLineService: CommandLineService,
  ) {}
  @Mutation(() => CommandLine)
  async addCommandLine(
    @Args('input')
    input: AddCommandLineInput,
  ): Promise<CommandLine> {
    const commandLine = new CommandLine();
    return this.commandLineService.save(commandLine);
  }
  @Mutation(() => Command)
  async updateCommandLine(
    @Args('input')
    input: AddCommandLineInput,
  ): Promise<Command> {
    return await this.commandService.findOneById(input.commandId);
  }

  @Mutation(() => Command)
  async removeCommandLine(@Args('id') id: number): Promise<Command> {
    const { commandId } = await this.commandLineService.findOne(id);
    await this.commandLineService.remove(id);
    return await this.commandService.findOneById(commandId);
  }
}
