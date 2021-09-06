import { gql } from '@apollo/client/core';
import { PAGINATION_META } from '../utils/pagination';
import { PROVIDER } from '../provider/provider.sdl';
import { COMMAND_LINE } from '../command-line/commandLine.sdl';
import { Command, CommandPagination } from '../types';
import { INVOICE_FIELDS } from '../invoice/incoice.sdl';

export const COMMAND_FIELDS = `
  id
  provider{${PROVIDER}}
  createdAt
`;
export const COMMAND = `
  ${COMMAND_FIELDS}
  commandLines{${COMMAND_LINE}}
  invoice {${INVOICE_FIELDS}}
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
export type DeleteCommandData = {
  deleteCommand: boolean;
}
export const DELETE_COMMAND = gql`
    mutation DeleteCommand($id: Int!) {
      deleteCommand(id: $id)
    }
`;
