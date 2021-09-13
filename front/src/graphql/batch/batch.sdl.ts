import { Batch, Medicine } from '../types';
import { gql } from '@apollo/client/core';

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
