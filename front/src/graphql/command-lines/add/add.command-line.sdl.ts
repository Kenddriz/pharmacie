import { Command } from '../../types';
import { gql } from '@apollo/client/core';
import { COMMAND } from '../../command/command';

export type CreateCommandLineData = {
  addCommandLine: Command
}

export const ADD_COMMAND_LINE = gql`
  mutation AddCommandLine($input:CreateOrUpdateCommandLineInput!) {
    addCommandLine(input:$input){${COMMAND}}
  }
`;
