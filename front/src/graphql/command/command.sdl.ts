import { gql } from '@apollo/client/core';
import { PAGINATION_META } from '../utils/pagination';
import { Command, CommandPagination } from '../types';
import { COMMAND_FIELDS, INVOICE_FIELDS, PROVIDER_FIELDS } from '../invoice/incoice.sdl';

export type PaginateCommandsData = {
  paginateCommands: CommandPagination;
}

export const PAGINATE_COMMAND = gql`
 query PaginateCommands($paginationInput: PaginationInput!) {
  paginateCommands(paginationInput: $paginationInput) {
    items{
      ${COMMAND_FIELDS}
      provider{${PROVIDER_FIELDS}}
      invoice{${INVOICE_FIELDS}}
    }
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
          ${COMMAND_FIELDS}
          provider{${PROVIDER_FIELDS}}
          invoice{${INVOICE_FIELDS}}
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
