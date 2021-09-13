import { StockMovement } from '../types';
import { gql } from '@apollo/client/core';
import { BATCH_FIELDS } from '../batch/batch.sdl';

export const STOCK_MVT_FIELDS = `
  id
  quantity
  price
  discount
  stock
  vat
`
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
