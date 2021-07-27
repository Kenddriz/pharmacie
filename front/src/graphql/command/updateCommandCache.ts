import { Command, QueryPaginateCommandsArgs } from '../types';
import { ApolloCache } from '@apollo/client';
import { CreateCommandData } from './create/create.command.sdl';
import { PAGINATE_COMMAND, PaginateCommandsData } from './read/paginate-commands.sdl';
import { paginationInput } from './read/paginate-commands.service';
import { cloneDeep } from '@apollo/client/utilities';

export const addCommandCache = (cache: ApolloCache<CreateCommandData>, cmd: Command) => {
  let cacheCommand = cache.readQuery<
    PaginateCommandsData,
    QueryPaginateCommandsArgs
    >({
    query: PAGINATE_COMMAND,
    variables: { paginationInput }
  });
  if(cacheCommand?.paginateCommands) {
    cacheCommand = cloneDeep(cacheCommand);
    cacheCommand.paginateCommands.items.unshift(cmd);
    cacheCommand.paginateCommands.meta.totalItems += 1;
    cache.writeQuery<PaginateCommandsData, QueryPaginateCommandsArgs>({
      query: PAGINATE_COMMAND,
      data: cacheCommand,
      variables: { paginationInput }
    })
  }
}
