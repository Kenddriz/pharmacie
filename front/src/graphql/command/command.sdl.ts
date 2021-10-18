import { gql } from '@apollo/client/core';
import { PAGINATION_META } from '../utils/pagination';
import { Command, CommandPagination, CommandsMonthly } from '../types';
import { COMMAND_FIELDS, INVOICE_FIELDS, PROVIDER_FIELDS } from '../invoice/incoice.sdl';

export type PaginateCommandsData = {
  paginateCommands: CommandPagination;
}
export const PAGINATE_COMMAND = gql`
 query PaginateCommands($input: PaginateProviderCommandsInput!) {
  paginateCommands(input: $input) {
    items{
      ${COMMAND_FIELDS}
      provider{${PROVIDER_FIELDS}}
      invoice{${INVOICE_FIELDS(false)}}
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
          invoice{${INVOICE_FIELDS()}}
        }
    }
`;

export type CommandsMonthlyData = {
  commandsMonthly: CommandsMonthly[];
}
export const COMMANDS_MONTHLY = gql`
    query CommandsMonthly($year: Int!) {
      commandsMonthly(year: $year) {
        month
        command
        invoice
      }
    }
`;

export type PaginateDeletedCommandsData = {
  paginateDeletedCommands: CommandPagination;
}
export const PAGINATE_DELETED_COMMANDS = gql`
  query PaginateDeletedCommands($input: PaginationInput!){
    paginateDeletedCommands(input: $input) {
      items{
        id createdAt archivedAt
        provider{id name address}
      }
      ${PAGINATION_META}
    }
  }
`;
export type SoftRemoveCommandData = {
  softRemoveCommand: Command;
}
export const SOFT_REMOVE_COMMAND = gql`
  mutation SoftRemoveCommand($id: Int!){
    softRemoveCommand(id: $id) {
      id createdAt archivedAt
      provider{id name address}
    }
  }
`;
export type RestoreCommandData = {
  restoreCommand: Command;
}
export const RESTORE_COMMAND = gql`
  mutation RestoreCommand($id: Int!) {
    restoreCommand(id: $id){
      ${COMMAND_FIELDS}
      provider{${PROVIDER_FIELDS}}
      invoice{${INVOICE_FIELDS()}}
    }
  }
`;
export type RemoveCommandData = {
  removeCommand: boolean;
}
export const REMOVE_COMMAND = gql`
  mutation RemoveCommand($id: Int!) {
    removeCommand(id: $id)
  }
`;
