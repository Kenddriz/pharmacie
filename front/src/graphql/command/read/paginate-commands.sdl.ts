import { gql } from '@apollo/client/core';
import { PAGINATION_META } from '../../shared/pagination';
import { COMMAND } from '../command';
import { CommandPagination } from '../../types';

export type PaginateCommandsData = {
  paginateCommands: CommandPagination
}

export const PAGINATE_COMMAND = gql`
 query PaginateCommands($paginationInput: PaginationInput!) {
  paginateCommands(paginationInput: $paginationInput) {
    items{${COMMAND}}
    ${PAGINATION_META}
  }
 }
`
