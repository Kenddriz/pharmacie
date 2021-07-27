import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CommandLineService } from '../command-line.service';
import { CommandLine } from '../command-line.entity';
import { Command } from '../../command/command.entity';
import { CreateOrUpdateCommandLineInput } from '../types/command-line.input';
import { CommandService } from '../../command/command.service';

@Resolver(() => CommandLine)
export class CommandLineResolver {
  constructor(
    private commandService: CommandService,
    private commandLineService: CommandLineService,
  ) {}
  private finDuplicate(
    source: Array<Record<string, any>>,
    target: Record<string, any>,
  ) {
    return source.find(
      (e) =>
        e.medicine.toLowerCase() === target.medicine.toLowerCase() &&
        e.formId === target.formId,
    );
  }
  @Mutation(() => Command)
  async addCommandLine(
    @Args('input')
    input: CreateOrUpdateCommandLineInput,
  ): Promise<Command> {
    const commandLines: Array<Record<string, any>> = [];
    const command = await this.commandService.findOneById(input.commandId);
    const existLines = await this.commandLineService.findByCommandId(
      input.commandId,
    );
    for (const commandLine of input.commandLines) {
      const existLine = this.finDuplicate(existLines, commandLine);
      if (existLine) {
        commandLine.quantity += existLine.quantity;
        await this.commandLineService.update(commandLine, existLine.id);
      } else {
        const duplicated = this.finDuplicate(commandLines, commandLine);
        if (duplicated) duplicated.quantity += commandLine.quantity;
        else commandLines.push({ command, ...commandLine });
      }
    }
    if (commandLines.length) await this.commandLineService.create(commandLines);
    return await this.commandService.findOneById(input.commandId);
  }
  @Mutation(() => Command)
  async updateCommandLine(
    @Args('input')
    input: CreateOrUpdateCommandLineInput,
  ): Promise<Command> {
    for (const cl of input.commandLines) {
      const { id, ...res } = cl;
      await this.commandLineService.update(res, id);
    }
    return await this.commandService.findOneById(input.commandId);
  }

  @Mutation(() => Command)
  async removeCommandLine(@Args('id') id: number): Promise<Command> {
    const { commandId } = await this.commandLineService.findOne(id);
    await this.commandLineService.remove(id);
    return await this.commandService.findOneById(commandId);
  }
}
