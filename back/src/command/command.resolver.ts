import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommandService } from './command.service';
import { Command } from './command.entity';
import { PurchaseInput } from './types/purchase.input';
import { PurchaseDto } from './types/purchase.dto';

@Resolver(() => Command)
export class CommandResolver {
  constructor(private readonly commandService: CommandService) {}

  @Mutation(() => Command)
  createCommand(@Args('createCommandInput') createCommandInput: PurchaseInput) {
    return this.commandService.create(createCommandInput);
  }

  @Query(() => [Command], { name: 'command' })
  findAll() {
    return this.commandService.findAll();
  }

  @Query(() => Command, { name: 'command' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commandService.findOne(id);
  }

  @Mutation(() => Command)
  updateCommand(@Args('updateCommandInput') updateCommandInput: PurchaseDto) {
    return this.commandService.update(updateCommandInput.id, updateCommandInput);
  }

  @Mutation(() => Command)
  removeCommand(@Args('id', { type: () => Int }) id: number) {
    return this.commandService.remove(id);
  }
}
