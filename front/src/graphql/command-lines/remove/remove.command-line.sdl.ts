import { gql } from '@apollo/client/core';
import { Command } from '../../types';
import { COMMAND } from '../../command/command';

export type RemoveCommandLineData = {
  removeCommandLine: Command;
}
export const REMOVE_CMD_LINE = gql`
  mutation RemoveCommandLine($id: Float!) {
    removeCommandLine(id:$id) {${COMMAND}}
  }
`;
