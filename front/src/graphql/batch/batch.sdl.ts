import {
  Batch,
  Medicine,
  BatchPaginationOutput,
  SoftRemoveBatchOutput,
} from '../types';
import { gql } from '@apollo/client/core';
import { PAGINATION_META } from '../utils/pagination';

export const BATCH_FIELDS = `
  id
  expirationDate
  currentStock
  createdAt
`;

export type CreateBatchData = {
  createBatch: Medicine;
}
export const CREATE_BATCH = gql`
  mutation CreateBatch($input: BatchFormInput!){
    createBatch(input: $input) {
      id
      batches{${BATCH_FIELDS}}
    }
  }
`;

export type UpdateBatchData = {
  updateBatch: Batch;
}
export const UPDATE_BATCH = gql`
  mutation UpdateBatch($input: UpdateBatchInput!) {
    updateBatch(input: $input) {
      ${BATCH_FIELDS}
    }
  }
`;
export type FindExistingBatchData = {
  findExistingBatch: Batch;
}
export const FIND_EXISTING_BATCH = gql`
  query FindExistingBatch($input: FindExistingBatchInput!) {
    findExistingBatch(input: $input){
      ${BATCH_FIELDS}
    }
  }
`;
export type CountStockMovementsData = {
  countStockMovements: number;
}
export const COUNT_STOCK_MOVEMENTS = gql`
    query CountStockMovements($id: Int!) {
      countStockMovements(id: $id)
    }
`;

export type PaginateDeletedBatchesData = {
  paginateDeletedBatches: BatchPaginationOutput;
}
export const PAGINATE_DELETED_BATCHES = gql`
  query PaginateDeletedBatches($input: PaginationInput!){
    paginateDeletedBatches(input: $input) {
      items{${BATCH_FIELDS} archivedAt}
      ${PAGINATION_META}
    }
  }
`;
export type SoftRemoveBatchData = {
  softRemoveBatch: SoftRemoveBatchOutput;
}
export const SOFT_REMOVE_BATCH = gql`
  mutation SoftRemoveBatch($id: Int!) {
    softRemoveBatch(id: $id) {
      medicine{
        id
        batches{${BATCH_FIELDS}}
      }
      batch {
        ${BATCH_FIELDS}
        archivedAt
      }
    }
  }
`;
export type RemoveBatchData = {
  removeBatch: boolean;
}
export const REMOVE_BATCH = gql`
  mutation RemoveBatch($id: Int!) {
    removeBatch(id: $id)
  }
`;
export type RestoreBatchData = {
  restoreBatch: Medicine;
}
export const RESTORE_BATCH = gql`
  mutation RestoreBatch($id: Int!) {
    restoreBatch(id: $id) {
      id
      batches{${BATCH_FIELDS}}
    }
  }
`;
