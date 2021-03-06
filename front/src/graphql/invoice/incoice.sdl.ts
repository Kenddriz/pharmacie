import { gql } from '@apollo/client/core';
import { Command, Invoice, InvoicePagination } from '../types';
import { PAYMENT_PARAMS } from '../payment/payment.sdl';
import { PAGINATION_META } from '../utils/pagination';
import { MEDICINE_PARAMS } from '../medicine/medicine.sdl';
import { ARTICLE_PARAMS } from '../article/article.sdl';
import { COMMAND_LINE } from '../command-line/commandLine.sdl';
import { BATCH_FIELDS } from '../batch/batch.sdl';

export type PaginateInvoicesData = {
  paginateInvoices: InvoicePagination
}
export type CreateInvoiceData = {
  createInvoice: Command
}
export const STOCK_MVT_FIELDS = `
  id
  quantity
  price
  discount
  stock
  vat
`
export const PROVIDER_FIELDS = `
  id
  name
  address
  avatar
  contacts {
    type
    list
  }
  createdAt
  updatedAt
`
export const COMMAND_FIELDS = `
  id
  commandLines{${COMMAND_LINE}}
  createdAt
`;
export const INVOICE_PARAMS = `
  id
  dueDate
  deliveryDate
  reference
  expense
`;

export const STOCK_MVT_DTO = `
  stockMovements {
    ${STOCK_MVT_FIELDS}
    batch {
      ${BATCH_FIELDS}
      medicine {
        ${MEDICINE_PARAMS}
        article{${ARTICLE_PARAMS}}
      }
    }
  }
`;
export const INVOICE_FIELDS = `
    ${INVOICE_PARAMS}
    payment{${PAYMENT_PARAMS}}
    ${STOCK_MVT_DTO}
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

export const PAGINATE_INVOICES = gql`
 query PaginateInvoices($paginationInput: PaginationInput!) {
  paginateInvoices(paginationInput: $paginationInput) {
    items{
      ${INVOICE_FIELDS}
      command{
        ${COMMAND_FIELDS}
        provider{${PROVIDER_FIELDS}}
      }
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
