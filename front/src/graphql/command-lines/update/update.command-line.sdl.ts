import { gql } from '@apollo/client/core';
import { Command } from '../../types';
import { COMMAND } from '../../command/command';

export type UpdateCommandLineData = {
  updateCommandLine: Command;
}
export const UPDATE_CMD_LINE = gql`
  mutation UpdateCommandLine($input: CreateOrUpdateCommandLineInput!) {
    updateCommandLine(input:$input) {${COMMAND}}
  }
`;
