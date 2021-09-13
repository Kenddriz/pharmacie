import { Invoice, Payment } from '../types';
import { gql } from '@apollo/client/core';
import { METHOD_PARAMS } from '../method/method.sdl';

export type CreatePaymentData = {
  createPayment: Invoice
}
export const PAYMENT_PARAMS = `
  id
  date
  note
  reference
  method{${METHOD_PARAMS}}
`;
 export const CREATE_PAYMENT = gql`
  mutation CreatePayment($input: CreatePaymentInput!){
    createPayment(input: $input){
      id
      payment{
        ${PAYMENT_PARAMS}
      }
    }
  }
 `;

export type UpdatePaymentData = {
 updatePayment: Payment;
}
export const UPDATE_PAYMENT = gql`
  mutation UpdatePayment($input: UpdatePaymentInput!){
    updatePayment(input: $input){
      ${PAYMENT_PARAMS}
    }
  }
`;
