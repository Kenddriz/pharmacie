import { gql } from '@apollo/client/core';
import { Invoice, InvoicePagination } from '../types';
import { PAYMENT_PARAMS } from '../payment/payment.sdl';
import { PROVIDER } from '../provider/provider.sdl';
import { PAGINATION_META } from '../utils/pagination';

export type PaginateInvoicesData = {
  paginateInvoices: InvoicePagination
}
export type CreateInvoiceData = {
  createInvoice: Invoice
}
export const INVOICE_FIELDS = `
    id
    dueDate
    deliveryDate
    reference
    expense
    ${PAYMENT_PARAMS}
    createdAt
`;
export const CREATE_INVOICE = gql`
  mutation CreateInvoice($input: CreateInvoiceInput!){
    createInvoice(input: $input) {
      id
      invoice {${INVOICE_FIELDS}}
    }
  }
`;

const INVOICE_PARAMS = `
  ${INVOICE_FIELDS}
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
      ${INVOICE_FIELDS}
    }
    ${PAGINATION_META}
  }
 }
`

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
