import { gql } from '@apollo/client/core';
import { Invoice, InvoicePagination } from '../types';
import { PAYMENT_PARAMS } from '../payment/payment.sdl';
import { PROVIDER } from '../provider/provider.sdl';
import { PAGINATION_META } from '../utils/pagination';

export type PaginateInvoicesData = {
  paginateInvoices: InvoicePagination
}
const INVOICE_PARAMS_ONLY = `
    id
    dueDate
    reference
    ${PAYMENT_PARAMS}
    createdAt
`;
const INVOICE_PARAMS = `
  ${INVOICE_PARAMS_ONLY}
  command{
    id
    arrived
    provider{${PROVIDER}}
  }
`;
export const PAGINATE_INVOICES = gql`
 query PaginateInvoices($paginationInput: PaginationInput!) {
  paginateInvoices(paginationInput: $paginationInput) {
    items{
      ${INVOICE_PARAMS}
    }
    ${PAGINATION_META}
  }
 }
`
export type CreateInvoiceData = {
  createInvoice: Invoice
}
export const CREATE_INVOICE = gql`
  mutation CreateInvoice($input:CreateInvoiceInput!){
    createInvoice(input:$input){
      delivery{
        id

      }
    }
  }
`;

export type UpdateInvoiceData = {
  updateInvoice: Invoice
}

export const UPDATE_INVOICE = gql`
  mutation updateInvoice($input:UpdateInvoiceInput!){
    updateInvoice(input:$input){${INVOICE_PARAMS}}
  }
`;

export type FindOneInvoiceData = {
  findOneInvoice: Invoice
}
export const FIND_ONE_INVOICE = gql`
  query FindOneInvoice($commandId:Float!){
    findOneInvoice(commandId:$commandId){${INVOICE_PARAMS_ONLY}}
  }
`;
