import { MEDICINE_PARAMS } from '../medicine/medicine.sdl';
import { Command, CommandLine } from '../types';
import { gql } from '@apollo/client/core';

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
export type RemoveCommandLineData = {
  removeCommandLine: Command;
}
export const REMOVE_COMMAND_LINE = gql`
  mutation RemoveCommandLine($id: String!) {
    removeCommandLine(id: $id) {
      id
      commandLines{${COMMAND_LINE}}
    }
  }
`;
