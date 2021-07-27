import { PROVIDER } from '../provider/provider';
import { COMMAND_LINE } from '../command-lines/commandLine';

export const COMMAND = `
  id
  provider{${PROVIDER}}
  commandLines{${COMMAND_LINE}}
  arrived
  createdAt
  updatedAt
`
