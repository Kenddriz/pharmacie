import { Command } from '../../types';
import { gql } from '@apollo/client/core';
import { COMMAND } from '../command';

export type CreateCommandData = {
  createCommand: Command
}

export const CREATE_CMD = gql`
  mutation CreateCommand($input: CreateCommandInput!){
    createCommand(input:$input){${COMMAND}}
  }
`;
