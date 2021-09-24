import { CancelSaleLineOutput, StockMovement, StockMovementPagination } from '../types';
import { gql } from '@apollo/client/core';
import { BATCH_FIELDS } from '../batch/batch.sdl';
import { PATIENT_FIELDS } from '../patient/patient.sdl';
import { PROVIDER_FIELDS, STOCK_MVT_FIELDS } from '../invoice/incoice.sdl';
import { PAGINATION_META } from '../utils/pagination';

export type UpdateAssuredLineData = {
  updateAssuredLine: StockMovement;
}
export const UPDATE_ASSURED_LINE = gql`
    mutation updateAssuredLine($input: UpdateAssuredLineInput!) {
      updateAssuredLine(input: $input) {
        ${STOCK_MVT_FIELDS}
        batch {
          ${BATCH_FIELDS}
          medicine { id currentVat }
        }
      }
    }
`;

export type PaginateStockMovementData = {
  paginateStockMovement: StockMovementPagination;
}
export const PAGINATE_STOCK_MOVEMENT = gql`
    query PaginateStockMovement($input: PaginateStockMovementInput!){
      paginateStockMovement(input: $input) {
        items {
          ${STOCK_MVT_FIELDS}
          batch{
            ${BATCH_FIELDS}
          }
          sale {
            id
            createdAt
            prescription{
              id
              patient{${PATIENT_FIELDS}}
            }
          }
          invoice {
            id
            createdAt
            command{
              id
              provider{${PROVIDER_FIELDS}}
            }
          }
        }
        ${PAGINATION_META}
      }
    }
`;

export type UpdateSaleLineData = {
  updateSaleLine: StockMovement;
}
export const UPDATE_SALE_LINE = gql`
    mutation UpdateSaleLine($input: UpdateSaleLineInput!) {
      updateSaleLine(input: $input) {
        ${STOCK_MVT_FIELDS}
        batch { id currentStock }
      }
    }
`;

export type CancelSaleLinesData = {
  cancelSaleLines: CancelSaleLineOutput;
}

export const CANCEL_SALE_LINES = gql`
    mutation CancelSaleLines($input: CancelSaleLinesInput!) {
      cancelSaleLines(input: $input) {
        sale{
          id
          stockMovements{
            ${STOCK_MVT_FIELDS}
          }
        }
        batches { id currentStock }
      }
    }
`;
