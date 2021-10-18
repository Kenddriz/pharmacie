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
  createdAt
`;
const OUT_MVT_FIELDS = `
  out {
    sale { id createdAt prescription {id } }
    ${STOCK_MVT_FIELDS}
  }
`;
export const STOCK_MVT_DTO = (out = false) => `
  stockMovements {
    ${STOCK_MVT_FIELDS}
    ${out ? OUT_MVT_FIELDS : ''}
    batch {
      ${BATCH_FIELDS}
      medicine {
        ${MEDICINE_PARAMS}
        article{${ARTICLE_PARAMS}}
      }
    }
  }
`;

export const INVOICE_FIELDS = (out = false) =>`
    ${INVOICE_PARAMS}
    payment{${PAYMENT_PARAMS}}
    ${STOCK_MVT_DTO(out)}
    createdAt
`;
export const CREATE_INVOICE = gql`
  mutation CreateInvoice($input: CreateInvoiceInput!){
    createInvoice(input: $input) {
      id
      invoice {${INVOICE_FIELDS()}}
    }
  }
`;
export const PAGINATE_INVOICES = (out: boolean) => gql`
 query PaginateInvoices($input: PaginateInvoiceInput!) {
  paginateInvoices(input: $input) {
    items{
      ${INVOICE_FIELDS(out)}
      command{
        ${out ? 'id' : COMMAND_FIELDS}
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

export type PaginateDeletedInvoicesData = {
  paginateDeletedInvoices: InvoicePagination;
}
export const PAGINATE_DELETED_INVOICES = gql`
  query PaginateDeletedInvoices($input: PaginationInput!){
    paginateDeletedInvoices(input: $input) {
      items{ ${INVOICE_PARAMS} archivedAt}
      ${PAGINATION_META}
    }
  }
`;
export type SoftRemoveInvoiceData = {
  softRemoveInvoice: Invoice;
}
export const SOFT_REMOVE_INVOICE = gql`
  mutation SoftRemoveInvoice($id: Int!){
    softRemoveInvoice(id: $id) {
      ${INVOICE_PARAMS} archivedAt
    }
  }
`;
export type RestoreInvoiceData = {
  restoreInvoice: Invoice;
}
export const RESTORE_INVOICE = gql`
  mutation RestoreInvoice($id: Int!) {
    restoreInvoice(id: $id){
      ${INVOICE_FIELDS(false)}
      command{
        ${COMMAND_FIELDS}
        provider{${PROVIDER_FIELDS}}
      }
    }
  }
`;
export type RemoveInvoiceData = {
  removeInvoice: boolean;
}
export const REMOVE_INVOICE = gql`
  mutation RemoveInvoice($id: Int!) {
    removeInvoice(id: $id)
  }
`;
