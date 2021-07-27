import { Command } from '../../types';
import { gql } from '@apollo/client/core';
import { COMMAND } from '../command';

export type UpdateCommandData = {
  updateCommand: Command
}

export const UPDATE_CMD = gql`
  mutation UpdateCommand($input:UpdateCommandInput!){
    updateCommand(input:$input){${COMMAND}}
  }
`;
