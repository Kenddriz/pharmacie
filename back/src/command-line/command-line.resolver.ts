import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Root,
  Query,
} from '@nestjs/graphql';
import { CommandLine } from './command-line.entity';
import { CommandService } from '../command/command.service';
import { CommandLineService } from './command-line.service';
import { Command } from '../command/command.entity';
import {
  AddCommandLineInput,
  DeleteCommandLineInput,
  UpdateCommandLineInput,
} from './dto/command-line.input';
import { Medicine } from '../medicine/medicine.entity';
import { MedicineService } from '../medicine/medicine.service';
import { PaginationInput } from '../shared/shared.input';
import { CommandLinePaginationOutput } from './dto/command-line.output';

@Resolver(() => CommandLine)
export class CommandLineResolver {
  constructor(
    private commandService: CommandService,
    private commandLineService: CommandLineService,
    private medicineService: MedicineService,
  ) {}
  @Mutation(() => Command)
  async addCommandLine(
    @Args('input')
    input: AddCommandLineInput,
  ): Promise<Command> {
    const commandLine = new CommandLine();
    const command = await this.commandService.findOneById(input.commandId);
    commandLine.quantity = input.commandLine.quantity;
    commandLine.medicine = await this.medicineService.findOne(
      input.commandLine.medicineId,
    );
    commandLine.command = command;
    await this.commandLineService.save(commandLine);
    return command;
  }
  @Mutation(() => CommandLine)
  async updateCommandLine(
    @Args('input')
    input: UpdateCommandLineInput,
  ): Promise<CommandLine> {
    const commandLine = await this.commandLineService.findOne(input.id);
    commandLine.medicine = await this.medicineService.findOne(
      input.commandLine.medicineId,
    );
    commandLine.quantity = input.commandLine.quantity;
    return await this.commandLineService.save(commandLine);
  }

  @Mutation(() => Command)
  async removeCommandLine(
    @Args('input') input: DeleteCommandLineInput,
  ): Promise<Command> {
    await this.commandLineService.remove(input.commandLineId);
    return await this.commandService.findOneById(input.commandId);
  }
  @ResolveField(() => Medicine)
  async medicine(@Root() command: CommandLine): Promise<Medicine> {
    return await this.medicineService.findOne(command.medicineId);
  }
  @Query(() => CommandLinePaginationOutput)
  async paginateDeletedCommandLines(
    @Args('input') input: PaginationInput,
  ): Promise<CommandLinePaginationOutput> {
    return this.commandLineService.paginateDeleted(input);
  }
}
