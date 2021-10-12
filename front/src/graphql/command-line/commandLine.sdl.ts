import { MEDICINE_PARAMS } from '../medicine/medicine.sdl';
import { Command, CommandLine, SoftRemoveCommandLineOutput, CommandLinePaginationOutput } from '../types';
import { gql } from '@apollo/client/core';
import { PAGINATION_META } from '../utils/pagination';
import { COMMAND_FIELDS } from '../invoice/incoice.sdl';

export const COMMAND_LINE = `
   id
   quantity
   medicine {
    ${MEDICINE_PARAMS}
    article {id commercialName}
   }
`;
export type AddCommandLineData = {
  addCommandLine: Command;
}
export const ADD_COMMAND_LINE = gql`
    mutation AddCommandLine($input: AddCommandLineInput!){
      addCommandLine(input: $input) {
        id
        commandLines{${COMMAND_LINE}}
      }
    }
`;
export type UpdateCommandLineData = {
  updateCommandLine: CommandLine;
}
export const UPDATE_COMMAND_LINE = gql`
  mutation UpdateCommandLine($input: UpdateCommandLineInput!){
    updateCommandLine(input: $input) {
      ${COMMAND_LINE}
    }
  }
`;

export type PaginateDeletedCommandLinesData = {
  paginateDeletedCommandLines: CommandLinePaginationOutput;
}
export const PAGINATE_DELETED_COMMAND_LINES = gql`
  query PaginateDeletedCommandLines($input: PaginationInput!){
    paginateDeletedCommandLines(input: $input) {
      items{${COMMAND_LINE} archivedAt}
      ${PAGINATION_META}
    }
  }
`;
export type SoftRemoveCommandLineData = {
  softRemoveCommandLine: SoftRemoveCommandLineOutput;
}
export const SOFT_REMOVE_COMMAND_LINE = gql`
  mutation SoftRemoveCommandLine($id: String!) {
    softRemoveCommandLine(id: $id) {
      command{${COMMAND_FIELDS}}
      commandLine {
        ${COMMAND_LINE} archivedAt
      }
    }
  }
`;
export type RemoveCommandLineData = {
  removeCommandLine: boolean;
}
export const REMOVE_COMMAND_LINE = gql`
  mutation RemoveCommandLine($id: String!) {
    removeCommandLine(id: $id)
  }
`;
export type RestoreCommandLineData = {
  restoreCommandLine: Command;
}
export const RESTORE_COMMAND_LINE = gql`
  mutation RestoreCommandLine($id: String!) {
    restoreCommandLine(id: $id) {
      ${COMMAND_FIELDS}
    }
  }
`;
