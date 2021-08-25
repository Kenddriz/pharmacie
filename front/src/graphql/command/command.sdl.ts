import { gql } from '@apollo/client/core';
import { PAGINATION_META } from '../utils/pagination';
import { PROVIDER } from '../provider/provider.sdl';
import { COMMAND_LINE } from '../command-line/commandLine';
import { CommandPagination } from '../types';

export const COMMAND = `
  id
  provider{${PROVIDER}}
  commandLines{${COMMAND_LINE}}
  createdAt
`
export type PaginateCommandsData = {
  paginateCommands: CommandPagination;
}

export const PAGINATE_COMMAND = gql`
 query PaginateCommands($paginationInput: PaginationInput!) {
  paginateCommands(paginationInput: $paginationInput) {
    items{${COMMAND}}
    ${PAGINATION_META}
  }
 }
`
