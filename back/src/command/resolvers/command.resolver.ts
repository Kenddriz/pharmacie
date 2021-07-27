import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommandService } from '../command.service';
import { Command } from '../command.entity';
import { CommandPagination } from '../types/command.dto';
import { CreateCommandInput, UpdateCommandInput } from '../types/command.input';
import { uniqId } from '../../shared/id-builder.service';
import { PaginationInput } from '../../shared/shared.input';

@Resolver(() => Command)
export class CommandResolver {
  constructor(private commandService: CommandService) {}

  @Mutation(() => Command)
  async createCommand(
    @Args('input') input: CreateCommandInput,
  ): Promise<Command> {
    const id = await uniqId('Command');
    await this.commandService.create({ ...input, id });
    return await this.commandService.findOneById(id);
  }
  @Mutation(() => Command)
  async updateCommand(
    @Args('input') input: UpdateCommandInput,
  ): Promise<Command> {
    const { id, ...res } = input;
    await this.commandService.update(id, res);
    return await this.commandService.findOneById(id);
  }
  @Query(() => CommandPagination)
  async paginateCommands(
    @Args('paginationInput') input: PaginationInput,
  ): Promise<CommandPagination> {
    return await this.commandService.paginate(input);
  }
}
