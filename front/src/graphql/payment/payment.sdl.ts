import { Invoice } from '../types';
import { gql } from '@apollo/client/core';
import { PAYMENT_MODE_PARAMS } from '../payment-mode/payment-modes.sdl';

export type SavePaymentData = {
  savePayment: Invoice
}
export const PAYMENT_PARAMS = `
  payment{
    id
    date
    description
    reference
    paymentMode{${PAYMENT_MODE_PARAMS}}
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
