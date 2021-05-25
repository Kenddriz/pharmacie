import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommandLineService } from './command-line.service';
import { CommandLine } from './command-line.entity';
import { CreateCommandLineInput } from './dto/create-command-line.input';
import { UpdateCommandLineInput } from './dto/update-command-line.input';

@Resolver(() => CommandLine)
export class CommandLineResolver {
  constructor(private readonly commandLineService: CommandLineService) {}

  @Mutation(() => CommandLine)
  createCommandLine(@Args('createCommandLineInput') createCommandLineInput: CreateCommandLineInput) {
    return this.commandLineService.create(createCommandLineInput);
  }

  @Query(() => [CommandLine], { name: 'commandLine' })
  findAll() {
    return this.commandLineService.findAll();
  }

  @Query(() => CommandLine, { name: 'commandLine' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commandLineService.findOne(id);
  }

  @Mutation(() => CommandLine)
  updateCommandLine(@Args('updateCommandLineInput') updateCommandLineInput: UpdateCommandLineInput) {
    return this.commandLineService.update(updateCommandLineInput.id, updateCommandLineInput);
  }

  @Mutation(() => CommandLine)
  removeCommandLine(@Args('id', { type: () => Int }) id: number) {
    return this.commandLineService.remove(id);
  }
}
