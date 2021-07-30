import { PaymentMode, RemovePaymentModeDto } from '../types';
import { gql } from '@apollo/client/core';

export type PaymentModes = {
  paymentModes: PaymentMode[]
}
export const PAYMENT_MODE_PARAMS = `
  id
  label
`;
export const PAYMENT_MODES = gql`
  query PaymentModes{
    paymentModes{${PAYMENT_MODE_PARAMS}}
  }
`;

export type CreatePaymentMode = {
  createPaymentMode: PaymentMode
}
export const CREATE_PAYMENT_MODE = gql`
  mutation CreatePaymentMode($input:PaymentModeInput!){
    createPaymentMode(input:$input){${PAYMENT_MODE_PARAMS}}
  }
`;

export type UpdatePaymentMode = {
  updatePaymentMode: PaymentMode
}
export const UPDATE_PAYMENT_MODE = gql`
  mutation updatePaymentMode($input:PaymentModeInput!){
    updatePaymentMode(input:$input){${PAYMENT_MODE_PARAMS}}
  }
`;

export type RemovePaymentModeData = {
  removePaymentMode: RemovePaymentModeDto;
};
export const REMOVE_PAYMENT_MODE = gql`
  mutation RemovePaymentMode($id: Float!){
    removePaymentMode(id:$id){
      id
      payment{reference date}
    }
  }
`;
