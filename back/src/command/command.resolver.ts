import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Root,
  Int,
} from '@nestjs/graphql';
import { CommandService } from './command.service';
import { Command } from './command.entity';
import { uniqId } from '../shared/id-builder.service';
import { CreateCommandInput, UpdateCommandInput } from './dto/command.input';
import { CommandPagination, CommandsMonthly } from './dto/command.dto';
import { PaginationInput } from '../shared/shared.input';
import { CommandLine } from '../command-line/command-line.entity';
import { Provider } from '../provider/provider.entity';
import { CommandLineService } from '../command-line/command-line.service';
import { ProviderService } from '../provider/provider.service';
import { MedicineService } from '../medicine/medicine.service';
import { Invoice } from '../invoice/invoice.entity';
import { InvoiceService } from '../invoice/invoice.service';

@Resolver(() => Command)
export class CommandResolver {
  constructor(
    private commandService: CommandService,
    private commandLineService: CommandLineService,
    private providerService: ProviderService,
    private invoiceService: InvoiceService,
    private medicineService: MedicineService,
  ) {}

  @Mutation(() => Command)
  async createCommand(
    @Args('input') input: CreateCommandInput,
  ): Promise<Command> {
    const command = new Command();
    command.id = await uniqId('Command');
    command.provider = await this.providerService.findOneById(input.providerId);
    const medicines = await this.medicineService.findByIds(
      input.commandLines.map((l) => l.medicineId),
    );
    const lines: CommandLine[] = medicines.map((medicine) => {
      const line = new CommandLine();
      line.medicine = medicine;
      line.quantity = input.commandLines.find(
        (i) => i.medicineId === medicine.id,
      ).quantity;
      return line;
    });
    command.commandLines = lines;
    return await this.commandService.save(command);
  }
  @Mutation(() => Command)
  async updateCommand(
    @Args('input') input: UpdateCommandInput,
  ): Promise<Command> {
    const command = await this.commandService.findOneById(input.id);
    return await this.commandService.save(command);
  }
  @Query(() => CommandPagination)
  async paginateCommands(
    @Args('paginationInput') input: PaginationInput,
  ): Promise<CommandPagination> {
    return await this.commandService.paginate(input);
  }

  @Query(() => Command)
  async findCommandById(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<Command> {
    return this.commandService.findOneById(id);
  }
  @Mutation(() => Boolean)
  async deleteCommand(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.commandService.delete(id);
  }

  /**Field resolver*/
  @ResolveField(() => [CommandLine])
  async commandLines(@Root() command: Command): Promise<CommandLine[]> {
    return await this.commandLineService.findByCommandId(command.id);
  }
  @ResolveField(() => Provider)
  async provider(@Root() command: Command): Promise<Provider> {
    return await this.providerService.findOneById(command.providerId);
  }
  @ResolveField(() => Invoice)
  async invoice(@Root() command: Command): Promise<Invoice> {
    return await this.invoiceService.findByCommandId(command.id);
  }
  @Query(() => Int)
  async countUndeliveredCommands() {
    return this.commandService.countUndeliveredCommands();
  }
  @Query(() => [CommandsMonthly])
  async commandsMonthly(
    @Args({ name: 'year', type: () => Int }) year: number,
  ): Promise<CommandsMonthly[]> {
    return this.commandService.commandsMonthly(year);
  }
  @Query(() => CommandPagination)
  async paginateDeletedCommands(
    @Args('input') input: PaginationInput,
  ): Promise<CommandPagination> {
    return this.commandService.paginateDeleted(input);
  }
}
