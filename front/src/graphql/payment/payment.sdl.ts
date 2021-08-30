import { Invoice } from '../types';
import { gql } from '@apollo/client/core';
import { METHOD_PARAMS } from '../method/method.sdl';

export type SavePaymentData = {
  savePayment: Invoice
}
export const PAYMENT_PARAMS = `
  payment{
    id
    date
    description
    reference
    method{${METHOD_PARAMS}}
  }
`;
 export const SAVE_PAYMENT = gql`
  mutation SavePayment($input: SavePaymentInput!){
    savePayment(input: $input){
      id
      ${PAYMENT_PARAMS}
    }
  }
 `;
