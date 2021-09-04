import { gql } from '@apollo/client/core';
import { PAGINATION_META } from '../utils/pagination';
import { PROVIDER } from '../provider/provider.sdl';
import { COMMAND_LINE } from '../command-line/commandLine.sdl';
import { Command, CommandPagination } from '../types';

export const COMMAND = `
  id
  provider{${PROVIDER}}
  commandLines{${COMMAND_LINE}}
  delivery {id}
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
export type CreateCommandData = {
  createCommand: Command;
}

export const CREATE_COMMAND = gql`
    mutation CreateCommand($input: CreateCommandInput!) {
        createCommand(input: $input) {
          ${COMMAND}
        }
    }
`;
